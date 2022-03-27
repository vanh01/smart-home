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
    }
}