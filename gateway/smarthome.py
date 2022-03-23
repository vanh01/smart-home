import serial.tools.list_ports
import random
import time
import sys
from Adafruit_IO import MQTTClient

AIO_FEED_IDS = ["bk-iot-led", "bk-iot-air-condition",
                "bk-iot-sound-active", "bk-iot-light-active", "bk-iot-temp-active", "bk-iot-temp-limit", "bk-iot-light-limit", "bk-iot-sound-limit"]


AIO_USERNAME = "vanh01"
AIO_KEY = "aio_RDff323WxKWkxGi6BqCaEKQxHWur"

lightLimit = 0
soundLimit = 0
tempLimit = 0
gasLimit = 50

led = "led-off"
airCondition = "air-off"  # off: 2, on: 3
speaker = "speaker-off"  # off: 4, on: 5

lightActive = True
soundActive = True
tempActive = True


def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

    client.receive("bk-iot-led")
    client.receive("bk-iot-air-condition")
    client.receive("bk-iot-sound-active")
    client.receive("bk-iot-light-active")
    client.receive("bk-iot-temp-active")
    client.receive("bk-iot-temp-limit")
    client.receive("bk-iot-light-limit")
    client.receive("bk-iot-sound-limit")


def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload)
    if isMicrobitConnected:
        if feed_id == "bk-iot-led":
            ser.write((str(payload) + "#").encode())
        elif feed_id == "bk-iot-air-condition":
            ser.write((str(payload) + "#").encode())
        elif feed_id == "bk-iot-light-limit":
            global lightLimit
            lightLimit = int(payload)
        elif feed_id == "bk-iot-sound-limit":
            global soundLimit
            soundLimit = int(payload)
        elif feed_id == "bk-iot-temp-limit":
            global tempLimit
            tempLimit = int(payload)
        elif feed_id == "bk-iot-light-active":
            global lightActive
            lightActive = True if payload == "true" else False
        elif feed_id == "bk-iot-sound-active":
            global soundActive
            soundActive = True if payload == "true" else False
        elif feed_id == "bk-iot-temp-active":
            global tempActive
            tempActive = True if payload == "true" else False


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
            # client.publish("bk-iot-temp", value)  # gui du lieu cho adafruit
            if tempActive:
                oldAirCondition = airCondition
                if value > tempLimit:
                    airCondition = "air-on"
                else:
                    airCondition = "air-off"
                if airCondition != oldAirCondition:
                    client.publish("bk-iot-air-condition", airCondition)
        if key == "HUMID":
            # client.publish("bk-iot-humid", value)
            pass
        elif key == "SOUND":
            # client.publish("bk-iot-sound", value)
            if soundActive:
                if value > soundLimit:
                    if led == "led-off":
                        led = "led-on"
                    else:
                        led = "led-off"
                    client.publish("bk-iot-led", led)
        elif key == "LIGHT":
            # client.publish("bk-iot-light", value)
            if lightActive:
                oldLed = led
                if value > lightLimit:
                    led = "led-on"
                else:
                    led = "led-off"
                if led != oldLed:
                    client.publish("bk-iot-led", led)
        elif key == "GAS":
            # client.publish("bk-iot-gas", value)
            oldSpeaker = speaker
            if value > gasLimit:
                speaker = "speaker-on"
            if speaker != oldSpeaker:
                # client.publish("bk-iot-speaker", speaker)
                pass
        elif key == "SWITCH":
            pass
            # ser.write()
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
