import React, { useState, useEffect } from "react";
import * as myServerApi from "../../ServerApi";

const ManageApartment = ({ setShowApartment, accounts, curIndex, account }) => {
    let initSystem = [
        { name: "Hệ thống khí gas", active: false },
        { name: "Hệ thống đèn qua cảm biến âm thanh", active: false },
        { name: "Hệ thống đèn qua cảm biến ánh sáng", active: false },
        { name: "Hệ thống đèn qua công tắc", active: false },
        { name: "Hệ thống điều hòa qua cảm biến", active: false },
        { name: "Hệ thống điều hòa qua công tắc", active: false },
        { name: "Màn hình LCD", active: false },
    ];

    const [apartments, setApartments] = useState([]);

    const [apartmentCur, setApartmentCur] = useState("");
    let [systemsCur, setSystemsCur] = useState(initSystem);

    const [apartmentNew, setApartmentNew] = useState({
        name: "",
        initSystem,
    });

    const [render, setRender] = useState(false);
    const [render2, setRender2] = useState(false);

    const convertDevicesToSystems = (devices) => {
        let temp = [];
        devices.forEach((device) => {
            if (device.id === "8") {
                temp.push({
                    name: "Hệ thống khí gas",
                    active: device.active,
                });
            } else if (device.id === "4") {
                temp.push({
                    name: "Hệ thống đèn qua cảm biến âm thanh",
                    active: device.active,
                });
            } else if (device.id === "5") {
                temp.push({
                    name: "Hệ thống đèn qua cảm biến ánh sáng",
                    active: device.active,
                });
            } else if (device.id === "9") {
                temp.push({
                    name: "Hệ thống đèn qua công tắc",
                    active: device.active,
                });
            } else if (device.id === "6") {
                temp.push({
                    name: "Hệ thống điều hòa qua cảm biến",
                    active: device.active,
                });
            } else if (device.id === "10") {
                temp.push({
                    name: "Hệ thống điều hòa qua công tắc",
                    active: device.active,
                });
            }
        });
        temp.push({ name: "Màn hình LCD", active: false });
        return temp;
    };

    const getData = async () => {
        let apartmentNames = await myServerApi.apartmentGetOne(
            accounts[curIndex].privatekey
        );
        console.log(accounts[curIndex])
        let temp = [];
        apartmentNames.forEach((a) => {
            temp.push(a.apartmentname);
        });

        let apartmentTemp = [];
        for (const t of temp) {
            let tempp = await getDevices(accounts[curIndex].privatekey, t);
            apartmentTemp.push({
                name: t,
                systems: tempp,
            });
        }
        setApartments(apartmentTemp);
        console.log(apartmentTemp);
        if (apartmentTemp.length > 0) {
            setApartmentCur(apartmentTemp[0].name);
            setSystemsCur(apartmentTemp[0].systems);
        }
    };

    const getDevices = async (key, apartmentname) => {
        let temp = await myServerApi.getListDevice(key, apartmentname);
        return convertDevicesToSystems(temp);
    };

    useEffect(() => {
        getData();
    }, [render]);
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
                        setApartmentCur(e.target.value);
                        let temp = apartments.filter(
                            (apartment) => apartment.name === e.target.value
                        )[0].systems;
                        setSystemsCur(temp);
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
                        onClick={async () => {
                            if (
                                apartmentNew.name !== "" &&
                                !apartments.some(
                                    (e) => e.name === apartmentNew.name
                                )
                            ) {
                                setApartments([...apartments, apartmentNew]);
                                console.log(apartmentNew);
                                await myServerApi.addApartment(
                                    account.privatekey,
                                    accounts[curIndex].phonenumber,
                                    apartmentNew
                                );
                                await myServerApi.addDevices(
                                    account.privatekey,
                                    initSystem,
                                    apartmentNew.name,
                                    accounts[curIndex].phonenumber
                                );
                                setRender(!render);
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
                    <input
                        type="text"
                        defaultValue={apartmentCur}
                        onChange={(e) => {
                            setApartmentCur(e.target.value);
                        }}
                        readOnly
                    />
                </label>
                <div className="manage-apartment-system">
                    {systemsCur.map((system, index) => {
                        return (
                            <label key={system.name}>
                                {system.name}
                                <input
                                    type="checkbox"
                                    checked={system.active}
                                    onChange={(e) => {
                                        system.active = e.target.checked;
                                        setRender2(!render2);
                                    }}
                                />
                            </label>
                        );
                    })}
                </div>
            </div>
            <div className="manage-apartment__button">
                <button
                    className="delete"
                    onClick={async () => {
                        await myServerApi.deleteApartment(account.privatekey, {
                            apartmentname: apartmentCur,
                            phonenumber: accounts[curIndex].phonenumber,
                        });
                        // let temp = apartments;
                        // let index = temp.findIndex(t => t.name === apartmentCur);
                        // temp.splice(index, 1);
                        // setApartments(temp);
                        setShowApartment(false);
                    }}
                >
                    Xóa
                </button>
                <button
                    className="save"
                    onClick={async () => {
                        // await myServerApi.updateApartment(account.privatekey, {
                        //     apartmentname: apartmentCur,
                        //     phonenumber: accounts[curIndex].phonenumber,
                        // });

                        await myServerApi.updateDevice(
                            account.privatekey,
                            accounts[curIndex].phonenumber,
                            apartmentCur,
                            systemsCur
                        );
                        setShowApartment(false);
                    }}
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default ManageApartment;
