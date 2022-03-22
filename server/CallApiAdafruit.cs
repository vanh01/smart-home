using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace server
{
    public class CallApiAdafruit
    {
        static private readonly string activeKey = "aio_dxXt34S8dCe3hKcWergSeoW4IDKA";
        static private readonly string userName = "vanh01";
        static private readonly string href = "https://io.adafruit.com";
        static private HttpClient client = new HttpClient();
        static private CallApiAdafruit _instance = new CallApiAdafruit();
        static public CallApiAdafruit Instance
        {
            get { return _instance; }
        }

        CallApiAdafruit()
        {
            client.DefaultRequestHeaders.Add("X-AIO-Key", activeKey);
        }

        public bool CreateGroup(string groupName)
        {
            try
            {
                string jsons = "{\"name\": \"" + groupName + "\"}";
                var content = new StringContent(jsons, Encoding.UTF8, "application/json");
                var response = client.PostAsync(@$"{href}/api/v2/{userName}/groups/", content).Result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return true;
        }

        public bool RemoveGroup(string groupKey)
        {
            try
            {
                var response = client.DeleteAsync(@$"{href}/api/v2/{userName}/groups/{groupKey}").Result;
                Console.WriteLine(response.Content.ReadAsStringAsync().Result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return true;
        }

        public bool CreateFeeds(string feedsName, string groupKey)
        {
            try
            {
                string jsons = "{\"feed\": {\"name\":\"" + feedsName + "\"}}";
                var content = new StringContent(jsons, Encoding.UTF8, "application/json");
                var response = client.PostAsync(@$"{href}/api/v2/vanh01/feeds?group_key={groupKey}", content).Result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return true;
        }

        public bool RemoveFeeds(string feedsKey)
        {
            try
            {
                var response = client.DeleteAsync(@$"{href}/api/v2/{userName}/feeds/{feedsKey}").Result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return true;
        }

        public bool CreateData(string feedsKey, object data)
        {
            try
            {
                string datajson = JsonSerializer.Serialize(data);
                string jsons = "{\"value\":\"" + datajson + "\"}";
                var content = new StringContent(jsons, Encoding.UTF8, "application/json");
                Console.WriteLine(jsons);
                var response = client.PostAsync(@$"{href}/api/v2/{userName}/feeds/{feedsKey}/data", content).Result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return true;
        }

    }
}