using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using server.Models;


namespace server
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        [HttpGet]
        [Route("{key}")]
        public List<Device> getDevice([FromRoute] string key, [FromQuery] string apartmentName)
        {
            string query = $@"SELECT device.phonenumber, device.apartmentname, device.id, device.devicename, device.active, device.limited
                            FROM `device`,`account`
                            WHERE (device.phonenumber = account.phonenumber) 
                                and account.privatekey = '{key}' and device.apartmentname = '{apartmentName}'";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            Console.WriteLine(key);
            return temp.ToList<Device>();
        }

        [HttpPut]
        [Route("update/{key}")]
        public int updateDevice([FromRoute] string key, [FromQuery] string apartmentName, [FromQuery] string id, [FromBody] dynamic obj)
        {
            int temp = -10;
            dynamic data = JObject.Parse(obj.ToString());
            string query = $@"update device
                            set active = {data.active},
                                limited = {data.limited}
                            WHERE phonenumber in (
                                SELECT device.phonenumber
                                from device,account
                                WHERE (device.phonenumber = account.phonenumber) and account.privatekey = '{key}'
                                )
                            and apartmentname = '{apartmentName}' and id = '{id}';";

            //             @$"select @phoneNum := account.phonenumber
            //     from device,account
            //     WHERE device.phonenumber = account.phonenumber and account.privatekey = 'asaxkioiowe123as'
            // ;

            // update device
            // set active = 100,
            // 	limited = 50
            // WHERE phonenumber = @phoneNum and apartmentname = '1' and id = '1';"

            temp = SqlExecutes.Instance.ExcuteNonQuery(query);
            return temp;
        }
    }
}
