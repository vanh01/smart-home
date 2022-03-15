import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [apartment, setApartment] = useState("");

    document.title = "Điều khiển";

    function show(e) {
        setApartment(e.target.innerText);
        let dropdown = document.querySelector(".dropdown");
        dropdown.classList.toggle("active");
    }

    useEffect(() => {
        setApartment(
            document.querySelector(".option > li:nth-child(1)").innerText
        );
    }, []);

    console.log("1");
    return (
        <>
            <div className="dashboard">
                <div
                    className="dropdown"
                    // onBlur={() => {
                    //     let dropdown = document.querySelector(".dropdown");
                    //     dropdown.classList.toggle("active");
                    // }}
                >
                    <input
                        type="text"
                        className="dropdown-text"
                        value={apartment}
                        readOnly
                        onClick={() => {
                            let dropdown = document.querySelector(".dropdown");
                            dropdown.classList.toggle("active");
                        }}
                    />
                    <ul className="option">
                        <li onClick={show}>Căn hộ 1</li>
                        <li onClick={show}>Căn hộ 2</li>
                        <li onClick={show}>Căn hộ 3</li>
                        <li onClick={show}>Căn hộ 4</li>
                        <li onClick={show}>Căn hộ 5</li>
                    </ul>
                </div>
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
