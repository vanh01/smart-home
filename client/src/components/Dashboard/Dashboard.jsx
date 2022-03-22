import React, { useEffect, useState } from "react";

const Dashboard = () => {
    document.title = "Điều khiển";

    const [ledOn, setLedOn] = useState(false);
    const [airConditionedOn, setAirConditionedOn] = useState(false);
    const [soundLimit, setSoundLimit] = useState(0);
    const [lightLimit, setLightLimit] = useState(0);
    const [tempLimit, setTempLimit] = useState(0);

    const [soundActive, setSoundActive] = useState(false);
    const [lightActive, setLightActive] = useState(false);
    const [tempActive, setTempActive] = useState(false);
    // console.log(lightOn);

    const switchLed = async (ledOn) => {
        var myHeaders = new Headers();
        myHeaders.append("X-AIO-Key", "aio_RDff323WxKWkxGi6BqCaEKQxHWur");
        myHeaders.append("Content-Type", "application/json");

        let value = ledOn ? "led-on" : "led-off";

        var raw = JSON.stringify({
            value: value,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://io.adafruit.com/api/v2/vanh01/feeds/bk-iot-led/data",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };
    const getLed = async () => {
        var myHeaders = new Headers();
        myHeaders.append("X-AIO-Key", "aio_RDff323WxKWkxGi6BqCaEKQxHWur");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        let ledOn = false;

        await fetch(
            "https://io.adafruit.com/api/v2/vanh01/feeds/bk-iot-led/data/last",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result.value);
                if (result.value === "led-on") ledOn = true;
                else ledOn = false;
            })
            .catch((error) => {
                console.log("error", error);
            });
        console.log(ledOn);
        return ledOn;
    };
    useEffect(() => {
        setLedOn(getLed());
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
                                            if (e.target.checked === true) {
                                                setLightActive(false);
                                            }
                                            setSoundActive(e.target.checked);
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
                                    onChange={(e) => {
                                        setSoundLimit(e.target.value);
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
                                            if (e.target.checked === true) {
                                                setSoundActive(false);
                                            }
                                            setLightActive(e.target.checked);
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
                                    onChange={(e) => {
                                        setLightLimit(e.target.value);
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
                                            setLightActive(false);
                                            setLedOn(e.target.checked);
                                            switchLed(e.target.checked);
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
                                        name=""
                                        type="checkbox"
                                        checked={tempActive}
                                        onChange={(e) => {
                                            setTempActive(e.target.checked);
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
                                    onChange={(e) => {
                                        setTempLimit(e.target.value);
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
                                            setAirConditionedOn(
                                                e.target.checked
                                            );
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
