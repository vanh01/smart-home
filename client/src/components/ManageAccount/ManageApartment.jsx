import React, { useState } from "react";

const ManageApartment = ({ setShowApartment }) => {
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

    const [systemsCur, setSystemsCur] = useState(
        apartments.length > 0
            ? apartments[0].systems
            : [
                  { name: "Hệ thống khí gas", active: false },
                  { name: "Hệ thống đèn qua cảm biến âm thanh", active: false },
                  { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
                  { name: "Hệ thống đèn qua công tắc", active: false },
                  { name: "Hệ thống điều hòa qua cảm biến", active: false },
                  { name: "Hệ thống điều hòa qua công tắc", active: false },
                  { name: "Màn hình LCD", active: false },
              ]
    );

    const [apartmentCur, setApartmentCur] = useState(
        apartments.length > 0 ? apartments[0].name : {}
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
                        let temp = apartments.filter(
                            (a) => a.name === e.target.value
                        )[0];
                        setApartmentCur(temp.name);
                        setSystemsCur(temp.systems);
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
                    <input type="text" value={apartmentCur} readOnly />
                </label>
                <div className="manage-apartment-system">
                    {systemsCur.map((system, index) => (
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
