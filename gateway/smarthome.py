import serial.tools.list_ports
import random
import time
import sys
from Adafruit_IO import MQTTClient

AIO_FEED_IDS = ["bk-iot-gas", "bk-iot-humid",
                "bk-iot-led", "bk-iot-light", "bk-iot-sound", "bk-iot-speaker", "bk-iot-temp"]


AIO_USERNAME = "vanh01"
AIO_KEY = "aio_RDff323WxKWkxGi6BqCaEKQxHWur"


def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)


def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:  # gui du lieu cho server
        if feed_id == "bk-iot-sound":
            pass  # gui du lieu cho server
        elif feed_id == "bk-iot-light":
            pass  # gui du lieu cho server
        elif feed_id == "bk-iot-temp":
            pass  # gui du lieu cho server
        elif feed_id == "bk-iot-humi":
            pass  # gui du lieu cho server
        elif feed_id == "bk-iot-gas":
            pass  # gui du lieu cho server
        elif feed_id == "bk-iot-switch":
            pass  # gui du lieu cho server
        elif feed_id == "bk-iot-led":
            # gui du lieu cho server
            # gui du lieu cho microbit
            ser.write((str(payload) + "#").encode())
        elif feed_id == "bk-iot-air-condition":
            # gui du lieu cho server
            # gui du lieu cho microbit
            ser.write((str(payload) + "#").encode())
        elif feed_id == "bk-iot-speaker":
            # gui du lieu cho server
            # gui du lieu cho microbit
            ser.write((str(payload) + "#").encode())
        elif feed_id == "bk-iot-light-limit":
            global lightLimit
            lightLimit = payload
        elif feed_id == "bk-iot-sound-limit":
            global soundLimit
            soundLimit = payload
        elif feed_id == "bk-iot-temp-limit":
            global tempLimit
            tempLimit = payload
        elif feed_id == "bk-iot-light-active":
            global lightActive
            lightActive = payload
        elif feed_id == "bk-iot-sound-active":
            global soundActive
            soundActive = payload
        elif feed_id == "bk-iot-temp-active":
            global tempActive
            tempActive = payload


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


isMicrobitConnected = False

ser = serial.Serial(port="COM4", baudrate=115200)
isMicrobitConnected = True

lightLimit = 30
soundLimit = 50
tempLimit = 30
gasLimit = 50

led = "led-off"
airCondition = 2  # off: 2, on: 3
speaker = 4  # off: 4, on: 5

lightActive = True
soundActive = True
tempActive = True


def processData(data):
    #  format: !ID:KEY:VALUE#
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")  # [id, key, value]
    print(splitData)
    global speaker
    global led
    global airCondition
    try:
        key = splitData[1]
        value = int(splitData[2])
        if key == "TEMP":
            client.publish("bk-iot-temp", value)  # gui du lieu cho adafruit
            if tempActive:
                oldAirCondition = airCondition
                if value > tempLimit:
                    airCondition = 3
                else:
                    airCondition = 2
                if airCondition != oldAirCondition:
                    client.publish("bk-iot-air-condition", airCondition)
        if key == "HUMID":
            client.publish("bk-iot-humid", value)
        elif key == "SOUND":
            client.publish("bk-iot-sound", value)
            if soundActive:
                if value > soundLimit:
                    if led == "led-off":
                        led = "led-on"
                    else:
                        led = "led-off"
                    client.publish("bk-iot-led", led)
        elif key == "LIGHT":
            client.publish("bk-iot-light", value)
            if lightActive:
                oldLed = led
                if value > lightLimit:
                    led = "led-on"
                else:
                    led = "led-off"
                if led != oldLed:
                    client.publish("bk-iot-led", led)
        elif key == "GAS":
            client.publish("bk-iot-gas", value)
            oldSpeaker = speaker
            if value > gasLimit:
                speaker = 5
            if speaker != oldSpeaker:
                client.publish("bk-iot-speaker", speaker)
        elif key == "SWITCH":
            ser.write()
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


while True:
    if isMicrobitConnected:
        readSerial()

    time.sleep(1)
