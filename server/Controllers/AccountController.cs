using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Account> GetAccounts()
        {
            List<Account> result = new List<Account>();

            DataTable dt = new DataTable();

            string query = "SELECT * FROM test.account";

            dt = SqlExecutes.Instance.ExcuteQuery(query);

            // foreach (DataRow dr in dt.Rows)
            // {
            //     string phonenumber = dr["phonenumber"].ToString();
            //     string password = dr["password"].ToString();
            //     int rules = Convert.ToInt32(dr["rules"].ToString());
            //     result.Add(new Account() { phonenumber = phonenumber, password = password, rules = rules });
            // }

            result = dt.ToList<Account>();

            return result;
        }
    }
}
