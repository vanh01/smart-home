using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;

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
    }
}