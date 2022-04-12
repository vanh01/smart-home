namespace server.Models
{
    public class Account
    {
        public string phonenumber { get; set; }
        public string password { get; set; }
        public int rules { get; set; }
        public string privatekey { get; set; }
    }
    public class AccountInfo
    {
        public string phonenumber { get; set; }
        public string password { get; set; }
        public int rules { get; set; }
        public string privatekey { get; set; }
        public string name { get; set; }        
        public string email { get; set; }
        public string dateupdated { get; set; }
        public string datecreated { get; set; }
    }
}