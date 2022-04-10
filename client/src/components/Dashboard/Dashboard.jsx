import React, { useEffect, useState } from "react";
import myAdafruitApi from "../../AdafruitApi";
import * as signalR from "@microsoft/signalr";
import * as serverApi from "../../ServerApi";

const Dashboard = () => {
    document.title = "Điều khiển";
    // console.log("dieu khien");
    const [ledOn, setLedOn] = useState(false);
    const [airConditionedOn, setAirConditionedOn] = useState(false);

    const [light, setLight] = useState({ limited: "", active: "" });
    const [sound, setSound] = useState({ limited: "", active: "" });
    const [temp, setTemp] = useState({ limited: "", active: "" });
    const [soundValue, setSoundValue] = useState(0);
    const [lightValue, setLightValue] = useState(0);
    const [tempValue, setTempValue] = useState(0);
    const [humiValue, setHumiValue] = useState(0);

    // console.log(sound);
    const getData = async () => {
        let device = await serverApi.getListDevice("asaxkioiowe123as", "1");
        let lastLog = await serverApi.getLastLog("asaxkioiowe123as", "1");
        let ledLog = lastLog.filter((l) => l.id === "1");
        let airLog = lastLog.filter((l) => l.id === "2");
        let soundLog = lastLog.filter((l) => l.id === "4");
        let lightLog = lastLog.filter((l) => l.id === "5");
        let tempLog = lastLog.filter((l) => l.id === "6");
        let humiLog = lastLog.filter((l) => l.id === "7");
        let soundDevice = device.filter((d) => d.id === "4")[0];
        let lightDevice = device.filter((d) => d.id === "5")[0];
        let tempDevice = device.filter((d) => d.id === "6")[0];
        setSound({
            ...sound,
            active: soundDevice.active,
            limited: soundDevice.limited,
        });
        setLight({
            ...light,
            active: lightDevice.active,
            limited: lightDevice.limited,
        });
        setTemp({
            ...temp,
            active: tempDevice.active,
            limited: tempDevice.limited,
        });
        setSoundValue(soundLog[0].value);
        setLightValue(lightLog[0].value);
        setTempValue(tempLog[0].value);
        setHumiValue(humiLog[0].value);
        setLedOn(ledLog[0].value.includes("led-on") ? true : false);
        setAirConditionedOn(airLog[0].value.includes("air-on") ? true : false);
    };
    useEffect(() => {
        async function hi() {
            await getData();
            const hubConnection = new signalR.HubConnectionBuilder()
                .withUrl("https://localhost:5001/hubs/activity")
                .withAutomaticReconnect()
                .build();
            hubConnection
                .start()
                .then((result) => {
                    console.log("Connected!");
                    // hubConnection.invoke("insertlog", "asaxkioiowe123as");
                    hubConnection.on("insertlog", (message) => {
                        if (message.id === "1")
                            setLedOn(message.value === "led-on" ? true : false);
                        else if (message.id === "2")
                            setAirConditionedOn(
                                message.value === "air-on" ? true : false
                            );
                        else if (message.id === "4")
                            setSoundValue(message.value);
                        else if (message.id === "5")
                            setLightValue(message.value);
                        else if (message.id === "6")
                            setTempValue(message.value);
                        else if (message.id === "7")
                            setHumiValue(message.value);
                    });
                })
                .catch((e) => console.log("Connection failed: ", e));
        }
        hi();
    }, []);

    const changeSoundActive = (e) => {
        if (e.target.checked === true && light.active === true) {
            setLight({
                ...light,
                active: false,
            });
            myAdafruitApi
                .getInstance()
                .postData("false", "bk-iot-light-active");
        }
        setSound({
            ...sound,
            active: e.target.checked,
        });
        myAdafruitApi
            .getInstance()
            .postData(e.target.checked.toString(), "bk-iot-sound-active");
    };

    const changeSountLimited = (e) => {
        setSound({
            ...sound,
            limited: e.target.value,
        });
        myAdafruitApi
            .getInstance()
            .postData(e.target.value.toString(), "bk-iot-sound-limit");
    };

    const changeLightActive = (e) => {
        if (e.target.checked === true && light.active === true) {
            setSound({
                ...sound,
                active: false,
            });
            myAdafruitApi
                .getInstance()
                .postData("false", "bk-iot-sound-active");
        }
        setLight({
            ...light,
            active: e.target.checked,
        });
        myAdafruitApi
            .getInstance()
            .postData(e.target.checked.toString(), "bk-iot-light-active");
    };

    const changeLightLimited = (e) => {
        setLight({
            ...light,
            limited: e.target.value,
        });
        myAdafruitApi
            .getInstance()
            .postData(e.target.value.toString(), "bk-iot-light-limit");
    };

    const changeLedOn = (e) => {
        if (light.active === true) {
            setLight({
                ...light,
                active: false,
            });
            myAdafruitApi
                .getInstance()
                .postData("false", "bk-iot-light-active");
        }
        setLedOn(e.target.checked);
        myAdafruitApi.getInstance().switchLed(e.target.checked);
    };

    const changeTempActive = (e) => {
        setTemp({
            ...temp,
            active: e.target.checked,
        });
        myAdafruitApi
            .getInstance()
            .postData(e.target.checked.toString(), "bk-iot-temp-active");
    };

    const changeTempLimited = (e) => {
        setTemp({
            ...temp,
            limited: e.target.value,
        });
        myAdafruitApi
            .getInstance()
            .postData(e.target.value.toString(), "bk-iot-temp-limit");
    };

    const changeAirOn = (e) => {
        if (temp.active === true) {
            setTemp({
                ...temp,
                active: false,
            });
            myAdafruitApi.getInstance().postData("false", "bk-iot-temp-active");
        }
        setAirConditionedOn(e.target.checked);
        myAdafruitApi.getInstance().switchAir(e.target.checked);
    };

    return (
        <>
            <div className="dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-light">
                        <h1>Hệ thống đèn</h1>
                        <div>
                            <div>
                                <span>Bật tắt qua âm thanh</span>
                                <label className="toggle">
                                    <input
                                        className="toggle__input"
                                        name=""
                                        type="checkbox"
                                        checked={sound.active}
                                        onChange={changeSoundActive}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng cường độ âm thanh</span>
                                <input
                                    type="text"
                                    defaultValue={sound.limited}
                                    onBlur={changeSountLimited}
                                />
                            </div>
                            <div>
                                <span>Cường độ âm thanh</span>
                                <input
                                    type="text"
                                    readOnly
                                    value={soundValue}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Bật tắt qua cảm biến ánh sáng</span>
                                <label className="toggle">
                                    <input
                                        className="toggle__input"
                                        name=""
                                        type="checkbox"
                                        checked={light.active}
                                        onChange={changeLightActive}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng cường độ sáng</span>
                                <input
                                    type="text"
                                    defaultValue={light.limited}
                                    onBlur={changeLightLimited}
                                />
                            </div>
                            <div>
                                <span>Cường độ ánh sáng</span>
                                <input
                                    type="text"
                                    readOnly
                                    value={lightValue}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Bật đèn</span>
                                <label className="toggle">
                                    <input
                                        className="toggle__input"
                                        name=""
                                        type="checkbox"
                                        checked={ledOn}
                                        onChange={changeLedOn}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-light">
                        <h1>Hệ thống điều hòa</h1>
                        <div>
                            <div>
                                <span>Bật tắt qua cảm biến nhiệt độ</span>
                                <label className="toggle">
                                    <input
                                        className="toggle__input"
                                        type="checkbox"
                                        checked={temp.active}
                                        onChange={changeTempActive}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng nhiệt độ</span>
                                <input
                                    type="text"
                                    defaultValue={temp.limited}
                                    onBlur={changeTempLimited}
                                />
                            </div>
                            <div>
                                <span>Nhiệt độ</span>
                                <input type="text" readOnly value={tempValue} />
                            </div>
                            <div>
                                <span>Độ ẩm</span>
                                <input type="text" readOnly value={humiValue} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Bật điều hòa</span>
                                <label className="toggle">
                                    <input
                                        className="toggle__input"
                                        name=""
                                        type="checkbox"
                                        checked={airConditionedOn}
                                        onChange={changeAirOn}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
