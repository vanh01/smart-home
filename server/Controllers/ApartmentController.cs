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
            // string query = $"SELECT * FROM apartment, account WHERE apartment.phonenumber = account.phonenumber;";
            // string query = $"SELECT * FROM apartment, account WHERE  phonenumber='{key}';";
            var temp = SqlExecutes.Instance.ExcuteQuery(query);
            // Console.WriteLine(temp.GetType());
            List<Apartment> apartments = temp.ToList<Apartment>();
            return apartments;
            // Apartment apartment = apartments[0];
            // return apartment;
        }

        [HttpDelete]
        [Route("{key1}")]
        public IActionResult DeleteApartment([FromRoute] string key, [FromBody] Apartment apartment)
        {
            string query = $"delete from test.device where device.apartmentname = '${apartment.apartmentname}' and device.phonenumber = '${apartment.phonenumber}'; delete from apartment where apartment.phonenumber = '{apartment.phonenumber}' and apartment.apartmentname = '{apartment.apartmentname}';";
            // string query = $"call remove_apartment('{key}', '{apartment.phonenumber}', '{apartment.apartmentname}');";

            int result = SqlExecutes.Instance.ExcuteNonQuery(query);

            if (result == 0)
                return BadRequest("Error!");

            return Ok("Success!");
        }

        //localhost:5000/api/apartment/kjadsfk/add
        // {  }
        [HttpPost]
        [Route("{key}/add")]
        public string AddApartment([FromRoute] string key, [FromBody] Apartment apartment)
        {
            string query = $"insert into apartment() value ('{apartment.phonenumber}', '{apartment.apartmentname}');";
            int num = 0;

            num = SqlExecutes.Instance.ExcuteNonQuery(query);
            if (num == 0)
                return "Fail!";

            return "Success!";
        }
    }
}