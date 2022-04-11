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
        [HttpPost]
        [Route("add/{key}")]
        public void PostInfo([FromRoute] string key, [FromBody] Information info)
        {
            string query = $"SELECT * FROM account WHERE privatekey='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            Account accountCheck = accounts[0];
            int rule = accountCheck.rules;
            if(rule == 2){
                string queryInfo = $"INSERT INTO information (phonenumber, email, name, datecreated, dateupdated) VALUES ('{info.phonenumber}', '{info.email}', '{info.name}', '{info.datecreated}', '{info.dateupdated}');";
                SqlExecutes.Instance.ExcuteNonQuery(queryInfo);
            }
            // Console.WriteLine(temp.GetType());
            // Console.WriteLine(temp.ToList<Account>());
            // List<Account> accounts = temp.ToList<Account>();
            // return accounts;
        }
    }
}