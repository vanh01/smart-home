import React, { useState } from "react";

const ManageApartment = ({setShowApartment}) => {
    const [apartments, setApartments] = useState([
        { name: "Căn hộ 1" },
        { name: "Căn hộ 2" },
        { name: "Căn hộ 3" },
        { name: "Căn hộ 4" },
    ]);
    console.log(apartments);

    let namedefault = apartments.length > 0 ? apartments[0].name : "";

    const [apartmentCur, setApartmentCur] = useState(namedefault);
    const [apartmentNew, setApartmentNew] = useState({ name: "" });

    const [systems, setSystems] = useState([
        { name: "Hệ thống khí gas", active: true },
        { name: "Hệ thống đèn qua cảm biến âm thanh", active: true },
        { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
        { name: "Hệ thống đèn qua công tắc", active: true },
        { name: "Hệ thống điều hòa qua cảm biến", active: false },
        { name: "Hệ thống điều hòa qua công tắc", active: true },
        { name: "Màn hình LCD", active: true },
    ]);

    return (
        <div className="manage-apartment">
            <button className="manage-apartment__exit" onClick= {()=>setShowApartment(false)}>x</button>
            <div className="manage-apartment-header">
                <select
                    onChange={(e) => {
                        setApartmentCur(e.target.value);
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
                                setApartments([
                                    ...apartments,
                                    apartmentNew,
                                ]);
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
                    <input type="text" defaultValue={apartmentCur} />
                </label>
                <div className="manage-apartment-system">
                    {systems.map((system, index) => (
                        <label key={index}>
                            {system.name}
                            <input
                                type="checkbox"
                                defaultChecked={system.active}
                                onChange={(e) => {
                                    system.active = e.target.checked;
                                    console.log(system);
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
