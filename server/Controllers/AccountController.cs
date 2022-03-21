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

            String connString = "Server=127.0.0.1; Database=test; port=3306; User Id=root; password=vietanh;";

            MySqlConnection conn = new MySqlConnection(connString);
            string sql = "select * from test.account";
            MySqlCommand cmd = new MySqlCommand(sql, conn);
            conn.Open();

            using (MySqlDataAdapter da = new MySqlDataAdapter(cmd))
            {
                da.Fill(dt);
            }
            foreach (DataRow dr in dt.Rows)
            {
                string phonnenumber = dr["phonenumber"].ToString();
                string password = dr["password"].ToString();
                int rules = Convert.ToInt32(dr["rules"].ToString());
                result.Add(new Account() { phonnenumber = phonnenumber, password = password, rules = rules });
            }
            conn.Close();
                

            return result;
        }
    }
}
