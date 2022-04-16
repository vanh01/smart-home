using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApartmentController : ControllerBase
    {

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
        [Route("{key}")]

        public List<Apartment> GetListApartment([FromRoute] string key)
        {
            string query = $"SELECT * FROM apartment, account WHERE apartment.phonenumber = account.phonenumber AND account.privatekey = '{key}' and apartment.active = true;";

            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Apartment> apartments = temp.ToList<Apartment>();
            return apartments;
        }

        [HttpPut]
        [Route("{key}")]
        public IActionResult DeleteApartment([FromRoute] string key, [FromBody] Apartment apartment)
        {
            if (getRules(key) == 1)
            {
                string query = $"update apartment set active = false where phonenumber='{apartment.phonenumber}' and apartmentname='{apartment.apartmentname}';";
                int result = SqlExecutes.Instance.ExcuteNonQuery(query);
                if (result == 0)
                    return BadRequest("Error!");

                return Ok("Success!");
            }
            return BadRequest("Error!");
        }

        [HttpPut]
        [Route("{key}/update")]
        public IActionResult UpdateApartment([FromRoute] string key, [FromBody] Apartment apartment)
        {
            if (getRules(key) == 1)
            {
                string query = $"update apartment set apartmentname='{apartment.apartmentname}' where phonenumber='{apartment.phonenumber}';";
                int result = SqlExecutes.Instance.ExcuteNonQuery(query);
                if (result == 0)
                    return BadRequest("Error!");
                return Ok("Success!");
            }
            return BadRequest("Error!");
        }

        [HttpPost]
        [Route("{key}/add")]
        public string AddApartment([FromRoute] string key, [FromBody] Apartment apartment)
        {
            if (getRules(key) == 1)
            {
                string query = $"insert into apartment() value ('{apartment.phonenumber}', '{apartment.apartmentname}', true);";
                int num = 0;
                Console.WriteLine(query);
                num = SqlExecutes.Instance.ExcuteNonQuery(query);
                if (num == 0)
                    return "Fail!";
                return "Success!";
            }
            return "Fail!";
        }
    }
}