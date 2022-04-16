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

        private int getRules(string key)
        {
            string query = $"SELECT * FROM account WHERE privatekey='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            if (accounts.Count > 0)
                return accounts[0].rules;
            return 0;
        }

        [HttpGet]
        [Route("key")]
        public IActionResult GetKey([FromQuery] string phonenumber, string password)
        {
            string query = $"SELECT * FROM account WHERE phonenumber='{phonenumber}' AND password='{password}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            string result = "";
            if (accounts.Count == 1)
                result = accounts[0].privatekey;
            else
                return BadRequest("Error!");
            return Ok(result);

        }

        [HttpGet]
        [Route("account")]
        public IActionResult GetAcount([FromQuery] string phonenumber, [FromQuery] string password)
        {
            string query = $"SELECT * FROM account WHERE phonenumber='{phonenumber}' AND password='{password}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            Account result = new Account();
            if (accounts.Count == 1)
                result = accounts[0];
            else
                return BadRequest("Error!");
            return Ok(result);

        }

        [HttpGet]
        [Route("account/forgot")]
        public IActionResult ForgotAcount([FromQuery] string phonenumber)
        {
            string query = $"SELECT * FROM account WHERE phonenumber='{phonenumber}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            Account result = new Account();
            if (accounts.Count == 1)
                result = accounts[0];
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


        [HttpGet]
        [Route("{key}")]
        public List<AccountInfo> GetListAccount([FromRoute] string key)
        {
            if (getRules(key) == 1)
            {
                string queryAll = @$"SELECT account.phonenumber, account.password, account.rules, account.privatekey, information.name,
                                    information.email, information.datecreated, information.dateupdated 
                                    FROM account, information
                                    WHERE account.phonenumber = information.phonenumber and account.rules != 0;";
                var tempAll = SqlExecutes.Instance.ExcuteQuery(queryAll);
                List<AccountInfo> accountsAll = tempAll.ToList<AccountInfo>();
                return accountsAll;
            }
            List<AccountInfo> accountInfos = new List<AccountInfo>();
            return accountInfos;
        }

        [HttpPost]
        [Route("add/{key}")]
        public void PostAccount([FromRoute] string key, [FromBody] Account account)
        {
            if (getRules(key) == 1)
            {
                string queryAdd = $"INSERT INTO account (phonenumber, password, privatekey, rules) VALUES ('{account.phonenumber}', '{account.password}', '{account.privatekey}', '{account.rules}');";
                SqlExecutes.Instance.ExcuteNonQuery(queryAdd);
            }
        }

        [HttpPut]
        [Route("{key}/update")]
        public int UpdateAccount([FromRoute] string key, [FromBody] Account account)
        {
            if (getRules(key) == 1)
            {
                string query = @$"update account
                            set phonenumber = '{account.phonenumber}', password= '{account.password}', rules = '{account.rules}'
                            WHERE privatekey = '{account.privatekey}'";
                int result = SqlExecutes.Instance.ExcuteNonQuery(query);
                return result;
            }
            return 0;
        }

        [HttpPut]
        [Route("{adminKey}/delete")]
        public int DeleteAccount([FromRoute] string adminKey, [FromBody] string key)
        {
            if (getRules(adminKey) == 1)
            {
                string query = @$"update account 
                            set rules = false
                            WHERE privatekey = '{key}'";
                int result = SqlExecutes.Instance.ExcuteNonQuery(query);
                return result;
            }
            return 0;
        }
    }
}
