using Microsoft.AspNetCore.Mvc;
using server.Models;
using System;

namespace server
{
    [ApiController]
    [Route("api/[controller]")]
    public class InformationController : ControllerBase
    {
        [HttpPut]
        [Route("{key}/update")]
        public int UpdateAccount([FromRoute] string key, [FromBody] Information information)
        {
            string query = @$"update information
                                set email= '{information.email}', name = '{information.name}', dateupdated = '{DateTime.Now.ToString("yyyy-MM-dd")}'
                                WHERE phonenumber in (
                                    SELECT phonenumber
                                    from account
                                    WHERE privatekey = '{key}'
                                )";
            int result = SqlExecutes.Instance.ExcuteNonQuery(query);
            return result;
        }
    }
}