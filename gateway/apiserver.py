import ssl
ssl._create_default_https_context = ssl._create_unverified_context
import http.client
import json



class apiserver:
    def insertLog(self, data):
        conn = http.client.HTTPSConnection("localhost", 5001)
        payload = json.dumps(data)
        headers = {
        'Content-Type': 'application/json'
        }
        conn.request("POST", "/api/log/insertLog", payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))
        
    def updateDevice(self, body, key, apartmentName, id):
        conn = http.client.HTTPSConnection("localhost", 5001)
        payload = json.dumps(body)
        headers = {
        'Content-Type': 'application/json'
        }
        conn.request("PUT", "/api/device/update/" + key + "?apartmentName="+ apartmentName + "&id=" + id, payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))

def main():
    print("Hello World!")
    c1 = apiserver()
    abc = {
        "phonenumber": "1",
        "apartmentname": "nct",
        "id": "123",
        "time": "10-10-2111",
        "type": "on",
        "value": "3123123",
        "humidity": "32241",
        "agent": "11"
    }
    c1.insertLog(abc)
    d = {
            "active": "4",
            "limited": "400"
        }
    
    
    c1.updateDevice(d, "asaxkioiowe123as", "nct", "123" )
    

if __name__ == "__main__":
    main()