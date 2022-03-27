using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;


namespace server
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        [HttpGet]
        [Route("/{key}/last")]
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
        public bool insertLog([FromBody] Log log)
        {
            int dt;
            string now_date = DateTime.Now.ToString("MM/dd/yyyy");
            {
                string query = $"insert into log() value('{log.phonenumber}', '{log.apartmentname}', '{log.id}', '{now_date}', '{log.type}', '{log.value}', '{log.humidity}', '{log.agent}');";

                dt = SqlExecutes.Instance.ExcuteNonQuery(query);
            }
            return (dt > 0) ? true : false;
        }

        // - Lấy được nhật ký của tất cả thiết bị: key, tên căn hộ -> list hoạt động (get)
        // Ex: https://localhost:5001/api/log/getAllLogs?key=1&name=nct
        [HttpGet]
        [Route("getAllLogs")]
        public IEnumerable<Log> GetAllLogs([FromQuery] string key, [FromQuery] string name)
        {
            List<Log> result = new List<Log>();
            DataTable dt = new DataTable();
            {
                string query = $"SELECT * FROM test.log WHERE phonenumber = '{key}' AND apartmentname = '{name}'";

                dt = SqlExecutes.Instance.ExcuteQuery(query);
                result = dt.ToList<Log>();
            }
            return result;
        }
    }

}