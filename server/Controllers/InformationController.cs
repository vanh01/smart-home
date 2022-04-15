using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using server.Models;
using server.Hubs;
using System.Threading.Tasks;

namespace server
{
    [ApiController]
    [Route("api/[controller]")]
    public class InformationController : ControllerBase
    {

        private int getRules(string key)
        {
            string query = $"SELECT * FROM account WHERE privatekey='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            if (accounts.Count > 0)
                return accounts[0].rules;
            return 0;
        }

        [HttpPost]
        [Route("add/{key}")]
        public void PostInfo([FromRoute] string key, [FromBody] Information info)
        {
            if (getRules(key) == 1)
            {
                string queryInfo = $"INSERT INTO information (phonenumber, email, name, datecreated, dateupdated) VALUES ('{info.phonenumber}', '{info.email}', '{info.name}', '{info.datecreated}', '{info.dateupdated}');";
                SqlExecutes.Instance.ExcuteNonQuery(queryInfo);
            }
        }

        [HttpPut]
        [Route("{key}/update")]
        public int UpdateAccount([FromRoute] string key, [FromBody] Information information)
        {
            if (getRules(key) == 1)
            {
                string query = @$"update information
                                set email= '{information.email}', name = '{information.name}', dateupdated = '{DateTime.Now.ToString("yyyy-MM-dd")}'
                                WHERE phonenumber = '{information.phonenumber}'";
                int result = SqlExecutes.Instance.ExcuteNonQuery(query);
                return result;
            }
            return 0;
        }
    }
}