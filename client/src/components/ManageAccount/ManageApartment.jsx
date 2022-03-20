import React, { useState } from "react";

const ManageApartment = () => {
    const [systems, setSystems] = useState([
        { name: "Hệ thống khí gas" },
        { name: "Hệ thống đèn qua cảm biến âm thanh" },
        { name: "Hệ thống đèn qua cảm biến ánh sáng" },
        { name: "Hệ thống đèn qua công tắc" },
        { name: "Hệ thống điều hòa qua cảm biến" },
        { name: "Hệ thống điều hòa qua công tắc" },
        { name: "Màn hình LCD" },
    ]);

    return (
        <>
            <div className="manage-apartment">
                <div className="manage-apartment-header">
                    <select name="" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
                    <div className="manage-apartment-new">
                        <input type="text" />
                        <button>+</button>
                    </div>
                    <button>x</button>
                </div>
                <div className="manage-apartment-body">
                    <label>
                        Tên căn hộ
                        <input type="text" readOnly />
                    </label>
                    <div className="manage-apartment-system">
                        {systems.map((system, index) => (
                            <label key={index}>
                                {system.name}
                                <input type="checkbox" name="" id="" />
                            </label>
                        ))}
                    </div>
                </div>
                <button className="delete">Xóa</button>
                <button className="save">Lưu</button>
            </div>
        </>
    );
};

export default ManageApartment;
