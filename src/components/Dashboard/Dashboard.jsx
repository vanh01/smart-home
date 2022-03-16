import React from "react";

const Dashboard = () => {
    document.title = "Điều khiển";

    console.log("1");
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
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng cường độ âm thanh</span>
                                <input type="text" />
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
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng cường độ sáng</span>
                                <input type="text" />
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
                                    />
                                    <div className="toggle__fill"></div>
                                </label>
                            </div>
                            <div>
                                <span>Ngưỡng nhiệt độ</span>
                                <input type="text" />
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
