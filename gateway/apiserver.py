import json
import http.client
import ssl
ssl._create_default_https_context = ssl._create_unverified_context


class apiserver:
    def insertLog(self, key, data):
        conn = http.client.HTTPSConnection("localhost", 5001)
        payload = json.dumps(data)
        headers = {
            'Content-Type': 'application/json'
        }
        conn.request("POST", "/api/log/" + key +
                     "/insertLog", payload, headers)
        # res = conn.getresponse()
        # data = res.read()
        # print(data.decode("utf-8"))

    def updateDevice(self, body, key, apartmentName, id):
        conn = http.client.HTTPSConnection("localhost", 5001)
        payload = json.dumps(body)
        headers = {
            'Content-Type': 'application/json'
        }
        conn.request("PUT", "/api/device/update/" + key +
                     "?apartmentName=" + apartmentName + "&id=" + id, payload, headers)
        # res = conn.getresponse()
        # data = res.read()
        # print(data.decode("utf-8"))
