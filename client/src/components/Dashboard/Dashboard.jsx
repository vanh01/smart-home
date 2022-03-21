import React, { useEffect, useState } from "react";

const Dashboard = () => {
    document.title = "Điều khiển";

    const [lightOn, setLightOn] = useState(false);
    const [airConditionedOn, setAirConditionedOn] = useState(false);
    const [soundLimit, setSoundLimit] = useState(0);
    const [lightLimit, setLightLimit] = useState(0);
    const [tempLimit, setTempLimit] = useState(0);

    const [soundActive, setSoundActive] = useState(false);
    const [lightActive, setLightActive] = useState(false);
    const [tempActive, setTempActive] = useState(false);
    // console.log(lightOn);

    useEffect(() => {}, []);
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
                                        checked={lightOn}
                                        onChange={(e) => {
                                            setLightActive(false);
                                            setLightOn(e.target.checked);
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
