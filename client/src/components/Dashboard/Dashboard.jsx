import React, { useEffect, useState } from "react";
import myAdafruitApi from "../../AdafruitApi";
import * as signalR from "@microsoft/signalr";

const Dashboard = () => {
    document.title = "Điều khiển";
    console.log("dieu khien");
    const [ledOn, setLedOn] = useState(false);
    const [airConditionedOn, setAirConditionedOn] = useState(false);
    const [soundLimit, setSoundLimit] = useState("");
    const [lightLimit, setLightLimit] = useState("");
    const [tempLimit, setTempLimit] = useState("");

    const [soundActive, setSoundActive] = useState(false);
    const [lightActive, setLightActive] = useState(false);
    const [tempActive, setTempActive] = useState(false);

    const getData = async () => {

    };
    useEffect(() => {
        getData();
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:5001/hubs/activity")
            .withAutomaticReconnect()
            .build();
        hubConnection
            .start()
            .then((result) => {
                console.log("Connected!");

                hubConnection.on("getlastlog", (message) => {
                    console.log(message);
                });
            })
            .catch((e) => console.log("Connection failed: ", e));
    }, []);

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
                                        checked={soundActive}
                                        onChange={(e) => {
                                            if (
                                                e.target.checked === true &&
                                                lightActive === true
                                            ) {
                                                setLightActive(false);
                                                myAdafruitApi
                                                    .getInstance()
                                                    .postData(
                                                        "false",
                                                        "bk-iot-light-active"
                                                    );
                                            }
                                            setSoundActive(e.target.checked);
                                            myAdafruitApi
                                                .getInstance()
                                                .postData(
                                                    e.target.checked.toString(),
                                                    "bk-iot-sound-active"
                                                );
                                        }}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng cường độ âm thanh</span>
                                <input
                                    type="text"
                                    defaultValue={soundLimit}
                                    onBlur={(e) => {
                                        setSoundLimit(e.target.value);
                                        myAdafruitApi
                                            .getInstance()
                                            .postData(
                                                e.target.value.toString(),
                                                "bk-iot-sound-limit"
                                            );
                                    }}
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
                                        checked={lightActive}
                                        onChange={(e) => {
                                            if (
                                                e.target.checked === true &&
                                                soundActive === true
                                            ) {
                                                setSoundActive(false);
                                                myAdafruitApi
                                                    .getInstance()
                                                    .postData(
                                                        "false",
                                                        "bk-iot-sound-active"
                                                    );
                                            }
                                            setLightActive(e.target.checked);
                                            myAdafruitApi
                                                .getInstance()
                                                .postData(
                                                    e.target.checked.toString(),
                                                    "bk-iot-light-active"
                                                );
                                        }}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng cường độ sáng</span>
                                <input
                                    type="text"
                                    defaultValue={lightLimit}
                                    onBlur={(e) => {
                                        setLightLimit(e.target.value);
                                        myAdafruitApi
                                            .getInstance()
                                            .postData(
                                                e.target.value.toString(),
                                                "bk-iot-light-limit"
                                            );
                                    }}
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
                                        onChange={(e) => {
                                            if (lightActive === true) {
                                                setLightActive(false);
                                                myAdafruitApi
                                                    .getInstance()
                                                    .postData(
                                                        "false",
                                                        "bk-iot-light-active"
                                                    );
                                            }
                                            setLedOn(e.target.checked);
                                            myAdafruitApi
                                                .getInstance()
                                                .switchLed(e.target.checked);
                                        }}
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
                                        checked={tempActive}
                                        onChange={(e) => {
                                            setTempActive(e.target.checked);
                                            myAdafruitApi
                                                .getInstance()
                                                .postData(
                                                    e.target.checked.toString(),
                                                    "bk-iot-temp-active"
                                                );
                                        }}
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng nhiệt độ</span>
                                <input
                                    type="text"
                                    defaultValue={tempLimit}
                                    onBlur={(e) => {
                                        setTempLimit(e.target.value);
                                        myAdafruitApi
                                            .getInstance()
                                            .postData(
                                                e.target.value.toString(),
                                                "bk-iot-temp-limit"
                                            );
                                    }}
                                />
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
                                        onChange={(e) => {
                                            if (tempActive === true) {
                                                setTempActive(false);
                                            }
                                            setAirConditionedOn(
                                                e.target.checked
                                            );
                                            myAdafruitApi
                                                .getInstance()
                                                .switchAir(e.target.checked);
                                        }}
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
