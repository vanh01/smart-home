using System.Data;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApartmentController : ControllerBase
    {
        [HttpGet]
        [Route("{key}")]

        public List<Apartment> GetListApartment([FromRoute] string key)
        {
            string query = $"SELECT * FROM apartment, account WHERE apartment.phonenumber = account.phonenumber AND account.privatekey = '{key}';";

            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            List<Apartment> apartments = temp.ToList<Apartment>();
            return apartments;

        }

        [HttpDelete]
        [Route("{key1}")]
        public IActionResult DeleteApartment([FromRoute] string key, [FromBody] Apartment apartment)
        {
            string query = $"delete from apartment where apartment.phonenumber = '{apartment.phonenumber}' and apartment.apartmentname = '{apartment.apartmentname}';";
            // string query = $"call remove_apartment('{key}', '{apartment.phonenumber}', '{apartment.apartmentname}');";

            int result = SqlExecutes.Instance.ExcuteNonQuery(query);

            if (result == 0)
                return BadRequest("Error!");

            return Ok("Success!");
        }
    }
}