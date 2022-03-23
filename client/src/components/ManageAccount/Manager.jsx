// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ManageApartment from "./ManageApartment";
import Add from "./Add";
import Modify from "./Modify";
import { useState } from "react";

const Manager = () => {
    let [showApartment, setShowApartment] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [showModify, setShowModify] = useState(false)
    return (
        <>
            <div className="manager-container">
                <div className="space-60"></div>
                <div className="head-manager prefix">
                    <button
                        onClick={
                            () => {
                                setShowAdd(!showAdd);
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
                <div className="manager-card">
                    <div className="manager-card-body">
                        <ShowTable showApartment={showApartment} setShowApartment={setShowApartment} showModify={showModify} setShowModify={setShowModify} />
                    </div>
                </div>
            </div>
            {showAdd ?
                <div className="manager-bg" onClick={
                    (e) => {
                        if (e.target === document.querySelector('.manager-bg'))
                            setShowAdd(false);

                    }}>
                    <Add setShowAdd={setShowAdd}/>
                </div>
                : ''}
            {showModify ?
                <div className="manager-bg" onClick={
                    (e) => {
                        if (e.target === document.querySelector('.manager-bg')) {
                            setShowModify(false);
                        }
                    }}>
                    <Modify setShowModify = {setShowModify} setShowApartment = {setShowApartment}/>
                </div> : ''}
            {showApartment ?
                <div className="manager-bg" onClick={
                    (e) => {
                        if (e.target === document.querySelector('.manager-bg'))
                            setShowApartment(false);
                    }}>
                    <ManageApartment setShowApartment = {setShowApartment}/>
                </div> : ""}
        </>
    );
};
export default Manager;

function ShowTable({ showApartment, setShowApartment, showModify, setShowModify }) {

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
                        <i onClick={() => setShowModify(!showModify)}
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i onClick={() => setShowApartment(!showApartment)} className="fa fa-home" aria-hidden="true"></i>
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
                        <i onClick={() => setShowModify(!showModify)}
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i onClick={() => setShowApartment(!showApartment)} className="fa fa-home" aria-hidden="true"></i>
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
                        <i onClick={() => setShowModify(!showModify)}
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i onClick={() => setShowApartment(!showApartment)} className="fa fa-home" aria-hidden="true"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
