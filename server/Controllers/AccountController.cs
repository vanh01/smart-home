using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        public int GetAccounts([FromBody] Account account)
        {
            int dt;
            {
                string query = $"insert into account() value(\"{account.phonenumber}\", \"{account.password}\", {account.rules}, \"{account.privatekey}\");";

                dt = SqlExecutes.Instance.ExcuteNonQuery(query);
            }
            return dt;
        }
        [HttpGet]
        public List<Account> GetAccount()
        {
            string query = $"select * from account;";
            var temp = SqlExecutes.Instance.ExcuteQuery(query); 
            return temp.ToList<Account>();
        }

        
        [HttpGet]
        [Route("key")]

        public string GetKey([FromQuery] string username, string password)
        {
            string query = $"SELECT * FROM account WHERE phonenumber='{username}' AND password='{password}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query); 
            // Console.WriteLine(temp.GetType());
            // Console.WriteLine(temp.ToList<Account>());
            List<Account> accounts = temp.ToList<Account>();
            Account account = accounts[0];
            string result = account.privatekey;
            return result;

        }
        // public string GetKey([FromQuery] string username, string password)
        // {
        //     string query = $"SELECT privatekey FROM account WHERE phonenumber='{username}' AND password='{password}';";
        //     var temp = SqlExecutes.Instance.ExcuteQuery(query); 
        //     Console.WriteLine(temp.GetType());
        //     // Console.WriteLine(temp.ToList<Account>());
        //     return temp.ToString();
        // }
                
    }
}
