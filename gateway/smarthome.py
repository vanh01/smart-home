import serial.tools.list_ports
import random
import time
import sys
from Adafruit_IO import MQTTClient
from apiserver import apiserver as myApi

AIO_FEED_IDS = ["bk-iot-led", "bk-iot-air-condition",
                "bk-iot-sound-active", "bk-iot-light-active", "bk-iot-temp-active", "bk-iot-temp-limit", "bk-iot-light-limit", "bk-iot-sound-limit"]


AIO_USERNAME = "vanh01"
AIO_KEY = "aio_nlle75SnyUL2NO8OdkLwqJoqH6pF"

lightLimit = 0
soundLimit = 0
tempLimit = 0
gasLimit = 300

led = "led-off"
airCondition = "air-off"  # off: 2, on: 3
speaker = "speaker-off"  # off: 4, on: 5

lightActive = True
soundActive = True
tempActive = True


phoneNumber = "1"
apartmentName = "1"
key = "asaxkioiowe123as"

firstTimes = True


def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)
        client.receive(feed)


def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)

# khi mà nhận được dữ liệu từ server adafruit


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:
        global led
        global airCondition
        global lightLimit
        global lightActive
        global soundActive
        global soundLimit
        global tempActive
        global tempLimit
        if feed_id == "bk-iot-led":
            leds = str(payload).split(' ')
            if firstTimes is False:
                myApi().insertLog(key, {
                    "phonenumber": phoneNumber,
                    "apartmentname": apartmentName,
                    "id": "1",
                    "value": leds[0],
                    "agent": leds[1]
                })
            led = leds[0]
            ser.write(str(led + "#").encode())
        elif feed_id == "bk-iot-air-condition":
            airs = str(payload).split(' ')
            if firstTimes is False:
                myApi().insertLog(key, {
                    "phonenumber": phoneNumber,
                    "apartmentname": apartmentName,
                    "id": "2",
                    "value": airs[0],
                    "agent": airs[1]
                })
            airCondition = airs[0]
            ser.write(str(airCondition + "#").encode())
        elif feed_id == "bk-iot-light-limit":
            lightLimit = int(payload)
            if firstTimes is False:
                myApi().updateDevice({
                    "active": lightActive,
                    "limited": lightLimit
                }, key, apartmentName, "5")
        elif feed_id == "bk-iot-sound-limit":
            soundLimit = int(payload)
            if firstTimes is False:
                myApi().updateDevice({
                    "active": soundActive,
                    "limited": soundLimit
                }, key, apartmentName, "4")
        elif feed_id == "bk-iot-temp-limit":
            tempLimit = int(payload)
            if firstTimes is False:
                myApi().updateDevice({
                    "active": tempActive,
                    "limited": tempLimit
                }, key, apartmentName, "6")
        elif feed_id == "bk-iot-light-active":
            lightActive = True if payload == "true" else False
            if firstTimes is False:
                myApi().updateDevice({
                    "active": lightActive,
                    "limited": lightLimit
                }, key, apartmentName, "5")
        elif feed_id == "bk-iot-sound-active":
            soundActive = True if payload == "true" else False
            if firstTimes is False:
                myApi().updateDevice({
                    "active": soundActive,
                    "limited": soundLimit
                }, key, apartmentName, "4")
        elif feed_id == "bk-iot-temp-active":
            tempActive = True if payload == "true" else False
            if firstTimes is False:
                myApi().updateDevice({
                    "active": tempActive,
                    "limited": tempLimit
                }, key, apartmentName, "6")


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort


isMicrobitConnected = False

# ser = serial.Serial(port="COM4", baudrate=115200)
# isMicrobitConnected = True
if getPort() != " None ":
    ser = serial . Serial(port=getPort(), baudrate=115200)
    isMicrobitConnected = True

# khi mà thiết bị input gửi dữ liệu thì gọi api lên server


def processData(data):
    #  format: !ID:KEY:VALUE#
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")  # [id, key, value]
    print(splitData)
    global speaker
    global led
    global airCondition
    global soundLimit
    global lightLimit
    global tempLimit
    try:
        key = splitData[1]
        value = int(splitData[2])
        if key == "TEMP":
            myApi().insertLog(key, {
                "phonenumber": phoneNumber,
                "apartmentname": apartmentName,
                "id": "6",
                "value": str(value),
                "agent": ""
            })
            if tempActive:
                oldAirCondition = airCondition
                if value > tempLimit and -20 < value < 100:
                    airCondition = "air-on temp"
                elif -20 < value < 100:
                    airCondition = "air-off temp"
                if airCondition != oldAirCondition:
                    client.publish("bk-iot-air-condition", airCondition)
        elif key == "HUMI":
            myApi().insertLog(key, {
                "phonenumber": phoneNumber,
                "apartmentname": apartmentName,
                "id": "7",
                "value": str(value),
                "agent": ""
            })
        elif key == "SOUND":
            myApi().insertLog(key, {
                "phonenumber": phoneNumber,
                "apartmentname": apartmentName,
                "id": "4",
                "value": str(value),
                "agent": ""
            })
            if soundActive:
                if value > soundLimit and 0 < value < 200:
                    if "led-off" in led:
                        led = "led-on sound"
                    else:
                        led = "led-off sound"
                    client.publish("bk-iot-led", led)
        elif key == "LIGHT":
            myApi().insertLog(key, {
                "phonenumber": phoneNumber,
                "apartmentname": apartmentName,
                "id": "5",
                "value": str(value),
                "agent": ""
            })
            if lightActive:
                oldLed = led
                if value < lightLimit and 0 < value < 1000:
                    led = "led-on light"
                else:
                    led = "led-off light"
                if led != oldLed:
                    client.publish("bk-iot-led", led)
        elif key == "GAS":
            myApi().insertLog(key, {
                "phonenumber": phoneNumber,
                "apartmentname": apartmentName,
                "id": "8",
                "value": str(value),
                "agent": ""
            })
            oldSpeaker = speaker
            if value > gasLimit:
                speaker = "speaker-on"
                ser.write(str("speaker-on" + '#').encode())
            else:
                ser.write(str("speaker-off" + '#').encode())
                speaker = "speaker-off"
            if speaker != oldSpeaker:
                myApi().insertLog(key, {
                    "phonenumber": phoneNumber,
                    "apartmentname": apartmentName,
                    "id": "3",
                    "value": speaker,
                    "agent": ""
                })
                ser.write(str(speaker + "#").encode())
        elif key == "SWITCH":
            myApi().insertLog(key, {
                "phonenumber": phoneNumber,
                "apartmentname": apartmentName,
                "id": "9",
                "value": str(value),
                "agent": ""
            })
            if value == 1:
                if 'led-on' in led:
                    led = 'led-off switch'
                else:
                    led = 'led-on switch'
                client.publish("bk-iot-led", led)
    except:
        pass


mess = ""


def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]


firstTimes = False

while True:
    if isMicrobitConnected:
        readSerial()
    time.sleep(1)
