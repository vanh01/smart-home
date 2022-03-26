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
    }
}
