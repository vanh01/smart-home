using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using server.Models;
using server.Hubs;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly IHubContext<AccountHub> _accountHub;

        public AccountController(IHubContext<AccountHub> accountHub)
        {
            _accountHub = accountHub;
        }
        
        [HttpGet]
        [Route("key")]
        public string GetKey([FromQuery] string phonenumber, string password)
        {
            string query = $"SELECT * FROM account WHERE phonenumber='{phonenumber}' AND password='{password}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            // Console.WriteLine(temp.GetType());
            // Console.WriteLine(temp.ToList<Account>());
            List<Account> accounts = temp.ToList<Account>();
            Account account = accounts[0];
            string result = account.privatekey;
            return result;

        }       
    }
}
