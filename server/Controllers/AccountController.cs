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


        [HttpPost]
        public async Task<int> GetAccounts([FromBody] Account account)
        {
            int dt = 0;
            // {
            //     string query = $"insert into account() value(\"{account.phonenumber}\", \"{account.password}\", {account.rules}, \"{account.privatekey}\");";

            //     dt = SqlExecutes.Instance.ExcuteNonQuery(query);
            // }

            await _accountHub.Clients.All.SendAsync("getaccount", account);

            return dt;
        }
    }
}
