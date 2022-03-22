// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ManageApartment from "./ManageApartment";
import Add from "./Add";
import Modify from "./Modify";
import { useState } from "react";

const Manager = () => {
    const [apartments, setApartments] = useState([
        { name: "canho1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
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
        <>
            <div className="manager-container">
                <div className="space-60"></div>
                <div className="head-manager prefix">
                    <button
                        onClick={
                            () => {
                                document.querySelector('.manager-bg').classList.toggle('display-none');
                                document.querySelector('.addPage').classList.toggle('display-none');
                                document.querySelector('.addPage').style.zIndex = 10;
                            }
                        }
                        title="Thêm tài khoản" type="button" className="add-account">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>

                    <div className="activity__date float-end">
                        <input
                            type="date"
                            className="date__select-box date__select"
                            defaultValue="2022-03-14"
                        ></input>
                        {/* <i className="fa-regular fa-arrow-right"></i> */}
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        <input
                            type="date"
                            className="date__select-box date__select"
                            defaultValue="2022-03-14"
                        ></input>
                    </div>
                    <div className="float-none"></div>
                </div>

                {/* /.card */}
                <div className="manager-card">
                    {/* /.card-header */}
                    <div className="manager-card-body">
                        <ShowTable />
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
                {/* <Add />
                <ManageApartment />
                <Modify /> */}
                {/* {ShowAdd()}
                {ShowManageApartment()}
                {ShowModify()} */}

            </div>
            <div
                onClick={
                    () => {
                        document.querySelector('.manager-bg').classList.toggle('display-none');
                        if (!document.querySelector('.addPage').classList.contains('display-none')) {
                            document.querySelector('.addPage').classList.toggle('display-none');
                            // document.querySelector('.manager-bg').classList.toggle('display-none');
                        }
                        if (!document.querySelector('.manage-apartment').classList.contains('display-none')) {
                            document.querySelector('.manage-apartment').classList.toggle('display-none');
                            // document.querySelector('.manager-bg').classList.toggle('display-none');
                        }
                        if (!document.querySelector('.modifyPage').classList.contains('display-none')) {
                            document.querySelector('.modifyPage').classList.toggle('display-none');
                            // document.querySelector('.manager-bg').classList.toggle('display-none');
                        }
                    }
                }
                className="manager-bg display-none">

            </div><div className="modifyPage display-none">
                <form action="#" className="modifyForm">
                    <div className="col1">
                        <label>Số điện thoại:</label> <br />
                        <input type="number" /> <br />
                        <label>Họ tên:</label> <br />
                        <input type="text" /> <br />
                        <label>Mật khẩu:</label> <br />
                        <input type="password" /> <br />
                        <label>Nhập lại mật khẩu:</label> <br />
                        <input type="password" /> <br />
                    </div>

                    <div className="col2">
                        <label>Quyền truy cập:</label> <br />
                        <select name="role">
                            <option value="user">Người dùng</option>
                            <option value="admin">Admin</option>
                        </select> <br />
                        <label>Email:</label> <br />
                        <input type="email" />
                    </div>
                    <div className="clear"></div> <br />
                    <input type="button" value="Quản lý căn hộ" class='button-manage' />
                    <input type="submit" value="Lưu" class='button-save' />
                    <input type="button" value="Xóa" class='button-delete' />
                </form>
            </div>
            <div className="addPage display-none">
                <form action="#" className="addForm">
                    <div className="col1">
                        <label>Số điện thoại:</label> <br />
                        <input type="number" /> <br />
                        <label>Họ tên:</label> <br />
                        <input type="text" /> <br />
                        <label>Mật khẩu:</label> <br />
                        <input type="password" /> <br />
                        <label>Nhập lại mật khẩu:</label> <br />
                        <input type="password" /> <br />
                    </div>

                    <div className="col2">
                        <label>Quyền truy cập:</label> <br />
                        <select name="role">
                            <option value="user">Người dùng</option>
                            <option value="admin">Admin</option>
                        </select> <br />
                        <label>Email:</label> <br />
                        <input type="email" />
                    </div>
                    <div className="clear"></div> <br />
                    <input type="submit" value="Thêm" class='button-add' />
                    <input
                        onClick={
                            () => {
                                document.querySelector('.manager-bg').classList.toggle('display-none');
                                document.querySelector('.addPage').classList.toggle('display-none');
                            }
                        }
                        type="button" value="Hủy" class='button-cancel' />
                </form>
            </div>
            <div className="manage-apartment display-none">
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
                    <button
                        onClick={
                            () => {
                                document.querySelector('.manager-bg').classList.toggle('display-none');
                                document.querySelector('.manage-apartment').classList.toggle('display-none');
                            }
                        }
                        >x</button>
                </div>
                <div className="manage-apartment-body">
                    <label>
                        Tên căn hộ
                        <input type="text" readOnly value={apartmentCur} />
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
                <button className="delete">Xóa</button>
                <button className="save">Lưu</button>
            </div>

        </>
    );
};
export default Manager;

function ShowTable() {

    return (
        <table id="example1" className="manager-table">
            <thead>
                <tr>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Mật khẩu</th>
                    <th>Email</th>
                    <th>Quyền</th>
                    <th>Ngày tạo TK</th>
                    <th>Ngày cập nhật</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Trần Văn A</td>
                    <td>0987123456 </td>
                    <td>abc123456</td>
                    <td>abc@gmail.com</td>
                    <td>Quản trị viên</td>
                    <td>2022-03-09</td>
                    <td>2022-03-14</td>
                    <td className="manager-icon">
                        <i onClick={ShowModify}
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i onClick={ShowManageApartment} className="fa fa-home" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>Trần Văn B</td>
                    <td>0987123123 </td>
                    <td>abc123456</td>
                    <td>acb@gmail.com</td>
                    <td>Người dùng</td>
                    <td>2022-03-09</td>
                    <td>2022-03-14</td>
                    <td className="manager-icon">
                        <i onClick={ShowModify}
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i onClick={ShowManageApartment} className="fa fa-home" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>Trần Văn C</td>
                    <td>0987456123 </td>
                    <td>abc123456</td>
                    <td>bac@gmail.com</td>
                    <td>Người dùng</td>
                    <td>2022-03-09</td>
                    <td>2022-03-14</td>
                    <td className="manager-icon">
                        <i onClick={ShowModify}
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i onClick={ShowManageApartment} className="fa fa-home" aria-hidden="true"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}


function ShowManageApartment() {
    document.querySelector('.manager-bg').classList.remove('display-none');
    document.querySelector('.manage-apartment').classList.toggle('display-none');
    document.querySelector('.manage-apartment').style.zIndex = 10;
}

function ShowModify() {
    document.querySelector('.manager-bg').classList.remove('display-none');
    document.querySelector('.modifyPage').classList.toggle('display-none');
    document.querySelector('.modifyPage').style.zIndex = 10;
}
