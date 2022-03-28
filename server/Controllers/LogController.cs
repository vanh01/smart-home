using System.Security.AccessControl;
using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {

        private readonly IHubContext<LogHub> _logHub;

        public LogController(IHubContext<LogHub> logHub)
        {
            _logHub = logHub;
        }

        [HttpGet]
        [Route("{key}/last")]
        public List<Log> getLastLog([FromRoute] string key, [FromQuery] string apartmentName, [FromQuery] string id)
        {
            string query = $"call get_last_data('{apartmentName}', '{id}');";

            List<Log> logs = new List<Log>();

            var dt = SqlExecutes.Instance.ExcuteQuery(query);
            logs = dt.ToList<Log>();

            return logs;
        }

        // - Thêm dữ liệu nhật ký hoạt động: key, tên căn hộ, id, value(object) -> success or fail (post)
        // POST, raw - JSON: https://localhost:5001/api/log/insertLog
        /*
        {
        "phonenumber": "1",
        "apartmentname": "nct",
        "id": "123",
        "time": "10-10-2111",
        "type": "off",
        "value": "3123123",
        "humidity": "32241",
        "agent": "11"
        }
        */
        [HttpPost]
        [Route("insertLog")]
        public async Task<bool> insertLog([FromBody] Log log)
        {
            int dt = 1;
            // string now_date = DateTime.Now.ToString("MM/dd/yyyy");
            // {
            //     string query = $"insert into log() value('{log.phonenumber}', '{log.apartmentname}', '{log.id}', '{now_date}', '{log.type}', '{log.value}', '{log.humidity}', '{log.agent}');";

            //     dt = SqlExecutes.Instance.ExcuteNonQuery(query);
            // }

            await _logHub.Clients.All.SendAsync("getlastlog", log);

            return (dt > 0) ? true : false;
        }

        // - Lấy được nhật ký của tất cả thiết bị: key, tên căn hộ -> list hoạt động (get)
        // Ex: https://localhost:5001/api/log/getAllLogs?key=asaxkioiowe123as&name=nct
        [HttpGet]
        [Route("getAllLogs")]
        public IEnumerable<Log> GetAllLogs([FromQuery] string key, [FromQuery] string name)
        {
            List<Log> result = new List<Log>();
            DataTable dt = new DataTable();
            {
                string query = $@"SELECT log.phonenumber, log.apartmentname, log.id, log.time, log.type, log.value, log.humidity, log.agent 
                                FROM test.log, test.account
                                WHERE account.privatekey = '{key}' AND log.apartmentname = '{name}'";


                dt = SqlExecutes.Instance.ExcuteQuery(query);
                result = dt.ToList<Log>();
            }
            return result;
        }
    }

}