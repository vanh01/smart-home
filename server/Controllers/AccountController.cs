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

        [HttpGet]
        [Route("{key}")]
        public List<AccountInfo> GetListAccount([FromRoute] string key)
        {
            string query = $"SELECT * FROM account WHERE privatekey='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            Account account = accounts[0];
            int rule = account.rules;
            // Console.WriteLine(temp.GetType());
            // Console.WriteLine(temp.ToList<Account>());
            if (rule == 1)
            {
                // string queryAll = $"SELECT * FROM account;";
                string queryAll = $"SELECT account.phonenumber, account.password, account.rules, account.privatekey, information.name, information.email, information.datecreated, information.dateupdated FROM account, information WHERE account.phonenumber = information.phonenumber and account.rules != 0;";
                var tempAll = SqlExecutes.Instance.ExcuteQuery(queryAll);
                List<AccountInfo> accountsAll = tempAll.ToList<AccountInfo>();
                return accountsAll;
            }
            List<AccountInfo> accountInfos = new List<AccountInfo>();
            return accountInfos;
        }

        // [HttpPost]
        // [Route("{key}")]
        // public void PostAccount([FromRoute] string key, [FromBody] Account account, [FromBody] Information info)
        // {
        //     string query = $"SELECT * FROM account WHERE privatekey='{key}';";
        //     var temp = SqlExecutes.Instance.ExcuteQuery(query);
        //     List<Account> accounts = temp.ToList<Account>();
        //     Account account = accounts[0];
        //     string rule = account.rules;
        //     if(rule == 1){
        //         string queryAdd = $"INSERT INTO account (phonenumber, password, privatekey, rules) VALUES ('{account.phonenumber}', '{account.password}', '{key}', '{account.rules}');";
        //         SqlExecutes.Instance.ExcuteNonQuery(queryAdd);
        //         string queryInfo = $"INSERT INTO information (phonenumber, email, name, datecreated, dateupdated) VALUES ('{info.phonenumber}', '{info.email}', '{info.name}', '{info.datecreated}', '{info.dateupdated}');";
        //         SqlExecutes.Instance.ExcuteNonQuery(queryInfo);
        //     }

        //     // Console.WriteLine(temp.GetType());
        //     // Console.WriteLine(temp.ToList<Account>());
        //     // List<Account> accounts = temp.ToList<Account>();
        //     // return accounts;
        // }


        [HttpPost]
        [Route("add/{key}")]
        public void PostAccount([FromRoute] string key, [FromBody] Account account)
        {
            string query = $"SELECT * FROM account WHERE privatekey='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Account> accounts = temp.ToList<Account>();
            Account accountCheck = accounts[0];
            int rule = accountCheck.rules;
            if (rule == 1)
            {
                string queryAdd = $"INSERT INTO account (phonenumber, password, privatekey, rules) VALUES ('{account.phonenumber}', '{account.password}', '{account.privatekey}', '{account.rules}');";
                SqlExecutes.Instance.ExcuteNonQuery(queryAdd);
            }

            // Console.WriteLine(temp.GetType());
            // Console.WriteLine(temp.ToList<Account>());
            // List<Account> accounts = temp.ToList<Account>();
            // return accounts;
        }

        // [HttpPost]
        // [Route("add/{key}")]
        // public void PostInfo([FromRoute] string key, [FromBody] Information info)
        // {
        //     string query = $"SELECT * FROM account WHERE privatekey='{key}';";
        //     var temp = SqlExecutes.Instance.ExcuteQuery(query);
        //     List<Account> accounts = temp.ToList<Account>();
        //     Account accountCheck = accounts[0];
        //     int rule = accountCheck.rules;
        //     if(rule == 1){
        //         string queryInfo = $"INSERT INTO information (phonenumber, email, name, datecreated, dateupdated) VALUES ('{info.phonenumber}', '{info.email}', '{info.name}', '{info.datecreated}', '{info.dateupdated}');";
        //         SqlExecutes.Instance.ExcuteNonQuery(queryInfo);
        //     }
        //     // Console.WriteLine(temp.GetType());
        //     // Console.WriteLine(temp.ToList<Account>());
        //     // List<Account> accounts = temp.ToList<Account>();
        //     // return accounts;
        // }

        [HttpPut]
        [Route("{key}/update")]
        public int UpdateAccount([FromRoute] string key, [FromBody] Account account)
        {
            string query = @$"update account 
                            set phonenumber = '{account.phonenumber}', password= '{account.password}', rules = '{account.rules}'
                            WHERE privatekey = '{key}'";
            int result = SqlExecutes.Instance.ExcuteNonQuery(query);
            return result;
        }

        [HttpPut]
        [Route("{key}/delete")]
        public int DeleteAccount([FromRoute] string key, [FromBody] string adminKey)
        {
            string query = @$"update account 
                            set rules = '0'
                            WHERE '1' in (SELECT rules from account WHERE privatekey = '{adminKey}') and privatekey = '{key}'";
            int result = SqlExecutes.Instance.ExcuteNonQuery(query);
            return result;
        }
    }
}
