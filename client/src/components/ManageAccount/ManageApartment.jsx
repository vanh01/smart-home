import React, { useState } from "react";

const ManageApartment = ({ setShowApartment }) => {
    const addApartment = (apartment) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            phonenumber: "1",
            apartmentname: apartment.name,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/apartment/hkajdsfn/add",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    const addDevices = (systems) => {
        let temp = [];
        systems.forEach((system) => {
            if (system.name === "Hệ thống khí gas") {
                temp += [{
                    id: "1",
                    apartmentname: apartmentNew.name,
                    
                }]; //device
            } else if (system.name === "Hệ thống đèn qua cảm biến âm thanh") {

            }
        });

        let raw = JSON.stringify(temp);
    };

    const [apartments, setApartments] = useState([
        {
            name: "Căn hộ 1",
            systems: [
                { name: "Hệ thống khí gas", active: true },
                { name: "Hệ thống đèn qua cảm biến âm thanh", active: true },
                { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
                { name: "Hệ thống đèn qua công tắc", active: true },
                { name: "Hệ thống điều hòa qua cảm biến", active: false },
                { name: "Hệ thống điều hòa qua công tắc", active: true },
                { name: "Màn hình LCD", active: true },
            ],
        },
        {
            name: "Căn hộ 2",
            systems: [
                { name: "Hệ thống khí gas", active: false },
                { name: "Hệ thống đèn qua cảm biến âm thanh", active: true },
                { name: "Hệ thống đèn qua cảm biến ánh sáng", active: true },
                { name: "Hệ thống đèn qua công tắc", active: true },
                { name: "Hệ thống điều hòa qua cảm biến", active: true },
                { name: "Hệ thống điều hòa qua công tắc", active: true },
                { name: "Màn hình LCD", active: true },
            ],
        },
        {
            name: "Căn hộ 3",
            systems: [
                { name: "Hệ thống khí gas", active: false },
                { name: "Hệ thống đèn qua cảm biến âm thanh", active: false },
                { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
                { name: "Hệ thống đèn qua công tắc", active: true },
                { name: "Hệ thống điều hòa qua cảm biến", active: false },
                { name: "Hệ thống điều hòa qua công tắc", active: false },
                { name: "Màn hình LCD", active: false },
            ],
        },
        {
            name: "Căn hộ 4",
            systems: [
                { name: "Hệ thống khí gas", active: false },
                { name: "Hệ thống đèn qua cảm biến âm thanh", active: true },
                { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
                { name: "Hệ thống đèn qua công tắc", active: false },
                { name: "Hệ thống điều hòa qua cảm biến", active: false },
                { name: "Hệ thống điều hòa qua công tắc", active: true },
                { name: "Màn hình LCD", active: true },
            ],
        },
    ]);

    const [apartmentCur, setApartmentCur] = useState(
        apartments.length > 0 ? apartments[0] : {}
    );
    const [apartmentNew, setApartmentNew] = useState({
        name: "",
        systems: [
            { name: "Hệ thống khí gas", active: false },
            { name: "Hệ thống đèn qua cảm biến âm thanh", active: false },
            { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
            { name: "Hệ thống đèn qua công tắc", active: false },
            { name: "Hệ thống điều hòa qua cảm biến", active: false },
            { name: "Hệ thống điều hòa qua công tắc", active: false },
            { name: "Màn hình LCD", active: false },
        ],
    });
    console.log("manage");
    console.log(apartmentCur);
    return (
        <div className="manage-apartment">
            <button
                className="manage-apartment__exit"
                onClick={() => setShowApartment(false)}
            >
                x
            </button>
            <div className="manage-apartment-header">
                <select
                    onChange={(e) => {
                        setApartmentCur(
                            apartments.filter(
                                (a) => a.name === e.target.value
                            )[0]
                        );
                    }}
                >
                    {apartments.map((apartment, index) => (
                        <option value={apartment.name} key={index}>
                            {apartment.name}
                        </option>
                    ))}
                </select>
                <div className="manage-apartment-new">
                    <input
                        type="text"
                        placeholder="Tên căn hộ mới"
                        onChange={(e) => {
                            setApartmentNew({
                                ...apartmentNew,
                                name: e.target.value,
                            });
                        }}
                    />
                    <button
                        onClick={() => {
                            if (
                                apartmentNew.name !== "" &&
                                !apartments.some(
                                    (e) => e.name === apartmentNew.name
                                )
                            ) {
                                setApartments([...apartments, apartmentNew]);
                                addApartment(apartmentNew);
                            } else {
                                alert("Vui lòng nhập tên căn hộ hợp lệ");
                            }
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="manage-apartment-body">
                <label>
                    <span>TÊN CĂN HỘ</span>
                    <input type="text" defaultValue={apartmentCur.name} />
                </label>
                <div className="manage-apartment-system">
                    {apartmentCur.systems.map((system, index) => (
                        <label key={index}>
                            {system.name}
                            <input
                                type="checkbox"
                                checked={system.active}
                                onChange={(e) => {
                                    system.active = e.target.checked;
                                }}
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div className="manage-apartment__button">
                <button className="delete">Xóa</button>
                <button className="save">Lưu</button>
            </div>
        </div>
    );
};

export default ManageApartment;
