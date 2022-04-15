using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using server.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using server.Hubs;

namespace server
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly IHubContext<DeviceHub> _logDevice;

        public DeviceController(IHubContext<DeviceHub> logDevice)
        {
            _logDevice = logDevice;
        }

        private int getRules(string key)
        {
            string query = $"SELECT * FROM account WHERE privatekey='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            if (accounts.Count > 0)
                return accounts[0].rules;
            return 0;
        }

        [HttpGet]
        [Route("{key}")]
        public List<Device> getDevice([FromRoute] string key, [FromQuery] string apartmentName)
        {
            string query = $@"SELECT device.phonenumber, device.apartmentname, device.id, device.devicename, device.active, device.limited
                            FROM `device`,`account`
                            WHERE (device.phonenumber = account.phonenumber) 
                            and account.privatekey = '{key}' and device.apartmentname = '{apartmentName}'";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            return temp.ToList<Device>();
        }

        [HttpPut]
        [Route("update/{key}")]
        public async Task<int> updateDevice([FromRoute] string key, [FromQuery] string apartmentName, [FromQuery] string id, [FromBody] dynamic obj)
        {
            if (getRules(key) == 1)
            {
                int temp = 0;
                dynamic data = JObject.Parse(obj.ToString());
                string query = $@"update device
                            set active = {data.active},
                                limited = {data.limited}
                            WHERE apartmentname = '{apartmentName}' and id = '{id}';";


                temp = SqlExecutes.Instance.ExcuteNonQuery(query);
                await _logDevice.Clients.All.SendAsync("asaxkioiowe123as", new { id = id, active = data.active, limited = data.limited });
                return temp;
            }
            return 0;
        }


        [HttpPost]
        [Route("{key}/add")]
        public string PostDevice([FromRoute] string key, [FromBody] List<Device> devices)
        {
            if (getRules(key) == 1)
            {
                int num = 0;
                foreach (var device in devices)
                {
                    num = SqlExecutes.Instance.ExcuteNonQuery($"insert into device() value ('{device.phonenumber}', '{device.apartmentname}', '{device.id}', '{device.devicename}', {device.active}, {device.limited});");
                }
                return num > 0 ? "Success!" : "Fail!";
            }
            return "Fail!";
        }


        [HttpPut]
        [Route("{key}/edit")]
        public string EditDevice([FromRoute] string key, [FromBody] List<Device> devices)
        {
            if (getRules(key) == 1)
            {
                foreach (var device in devices)
                {
                    SqlExecutes.Instance.ExcuteNonQuery($@"UPDATE device
                                                    SET `devicename` = '{device.devicename}', `active` = {device.active}, `limited` = {device.limited} 
                                                    WHERE `phonenumber` = '{device.phonenumber}' AND `apartmentname` = '{device.apartmentname}' AND `id` = '{device.id}';");
                }
                return "Success!";
            }
            return "Fail!";
        }
    }
}
