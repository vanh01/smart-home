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
        public IActionResult GetKey([FromQuery] string phonenumber, string password)
        {
            string query = $"SELECT * FROM account WHERE phonenumber='{phonenumber}' AND password='{password}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            // Console.WriteLine(temp.GetType());
            // Console.WriteLine(temp.ToList<Account>());
            List<Account> accounts = temp.ToList<Account>();
            string result = "";
            if (accounts.Count == 1)
                result = accounts[0].privatekey;
            else
                return BadRequest("Error!");
            return Ok(result);

        }

        [HttpGet]
        [Route("password")]
        public IActionResult getPassword([FromQuery] string phonenumber)
        {
            string query = $"select * from account where phonenumber = '{phonenumber}'";

            var temp = SqlExecutes.Instance.ExcuteQuery(query).ToList<Account>();
            var result = "";
            if (temp.Count == 1)
                result = temp[0].password;
            else
                return BadRequest("Error!");
            return Ok(result);
        }

    }
}
