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


        //Example
        /*
        POST: https://localhost:5001/api/device/asaxkioiowe123as/add
        [{
            "phonenumber": "1",
            "apartmentname": "1",
            "id": "18",
            "devicename": "Loane",
            "active": true,
            "limited": 100
        },
        {
            "phonenumber": "1",
            "apartmentname": "1",
            "id": "19",
            "devicename": "Loaneee",
            "active": false,
            "limited": 100
        }
        ]
        */
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

        //Edit thiết bị trong căn hộ
        /* POST: https://localhost:5001/api/device/asaxkioiowe123as/edit
        [{
            "phonenumber": "1",
            "apartmentname": "1",
            "id": "2",
            "devicename": "Dieuhoane",
            "active": false,
            "limited": 200
        }]
        */
        /*
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify([
            {
                "phonenumber": "1",
                "apartmentname": "1",
                "id": "3",
                "devicename": "Dieuhoeeane",
                "active": true,
                "limited": 200
            }
            ]);

            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://localhost:5001/api/device/asaxkioioaawe123as/edit", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        */
        [HttpPut]
        [Route("{key}/edit")]
        public string EditDevice([FromRoute] string key, [FromBody] List<Device> devices)
        {

            foreach (var device in devices)
            {
                SqlExecutes.Instance.ExcuteNonQuery($@"UPDATE device
                                                    SET `devicename` = '{device.devicename}', `active` = {device.active}, `limited` = {device.limited} 
                                                    WHERE `phonenumber` = '{device.phonenumber}' AND `apartmentname` = '{device.apartmentname}' AND `id` = '{device.id}';");
            }
            return "";
        }
    }
}
