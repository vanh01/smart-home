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
            int temp = -10;
            dynamic data = JObject.Parse(obj.ToString());
            string query = $@"update device
                            set active = {data.active},
                                limited = {data.limited}
                            WHERE apartmentname = '{apartmentName}' and id = '{id}';";
            // string query = $@"select @phoneNum := account.phonenumber
            //                 from device,account
            //                 WHERE device.phonenumber = account.phonenumber and account.privatekey = '{key}';
            //                 update device
            //                 set active = {data.active},
            //                     limited = {data.limited}
            //                 WHERE phonenumber = @phoneNum and apartmentname = '{apartmentName}' and id = '{id}';";

            //             @$"select @phoneNum := account.phonenumber
            //     from device,account
            //     WHERE device.phonenumber = account.phonenumber and account.privatekey = 'asaxkioiowe123as'
            // ;

            // update device
            // set active = 100,
            // 	limited = 50
            // WHERE phonenumber = @phoneNum and apartmentname = '1' and id = '1';"

            temp = SqlExecutes.Instance.ExcuteNonQuery(query);
            await _logDevice.Clients.All.SendAsync("asaxkioiowe123as", new { id = id, active = data.active, limited = data.limited });
            return temp;
        }

        [HttpPost]
        [Route("{key}/add")]
        public string PostDevice([FromRoute] string key, [FromBody] List<Device> devices)
        {

            foreach (var device in devices)
            {
                SqlExecutes.Instance.ExcuteNonQuery($"insert into device() value ('{device.phonenumber}', '{device.apartmentname}', '{device.id}', '{device.devicename}', {device.active}, {device.limited});");
            }
            return "";
        }
    }
}
