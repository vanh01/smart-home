namespace server.Models
{
    public class Device
    {
        public string phonenumber { get; set; }
        public string apartmentname { get; set; }
        public string id { get; set; }
        public string devicename { get; set; }
        public bool active { get; set; }
        public int limited { get; set; }
    }
}