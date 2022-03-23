// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ManageApartment from "./ManageApartment";
import Add from "./Add";
import Modify from "./Modify";
import { useState } from "react";


const Manager = () => {
    let [accounts, setAccount] = useState([
        { name: "Trần Văn A", phone: "0987123456", password: "abc123456", email: "abc@gmail.com", access: "Quản trị viên", createDate: "2022-3-09", updateDate: "2022-3-14" },
        { name: "Trần Văn B", phone: "0987123123", password: "abc123456", email: "acb@gmail.com", access: "Người dùng", createDate: "2022-3-10", updateDate: "2022-3-14" },
        { name: "Trần Văn C", phone: "0987123111", password: "abc123456", email: "cab@gmail.com", access: "Người dùng", createDate: "2022-3-11", updateDate: "2022-3-14" },
    ])
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
                        <ShowTable showApartment={showApartment} setShowApartment={setShowApartment} showModify={showModify} setShowModify={setShowModify} accounts={accounts} setAccount={setAccount} />
                    </div>
                </div>
            </div>
            {showAdd ?
                <div className="manager-bg" onClick={
                    (e) => {
                        if (e.target === document.querySelector('.manager-bg'))
                            setShowAdd(false);

                    }}>
                    <Add setShowAdd={setShowAdd} accounts={accounts} setAccount={setAccount} />
                </div>
                : ''}
            {showModify ?
                <div className="manager-bg" onClick={
                    (e) => {
                        if (e.target === document.querySelector('.manager-bg')) {
                            setShowModify(false);
                        }
                    }}>
                    <Modify setShowModify={setShowModify} setShowApartment={setShowApartment} />
                </div> : ''}
            {showApartment ?
                <div className="manager-bg" onClick={
                    (e) => {
                        if (e.target === document.querySelector('.manager-bg'))
                            setShowApartment(false);
                    }}>
                    <ManageApartment setShowApartment={setShowApartment} />
                </div> : ""}
        </>
    );
};
export default Manager;

function ShowTable({ showApartment, setShowApartment, showModify, setShowModify, accounts, setAccount }) {
    // let [accounts, setAccount] = useState([
    //     { name: "Trần Văn A", phone: "0987123456", password: "abc123456", email: "abc@gmail.com", access: "Quản trị viên", createDate: "2022-03-09", updateDate: "2022-03-14" },
    //     { name: "Trần Văn B", phone: "0987123123", password: "abc123456", email: "acb@gmail.com", access: "Người dùng", createDate: "2022-03-10", updateDate: "2022-03-14" },
    //     { name: "Trần Văn C", phone: "0987123111", password: "abc123456", email: "cab@gmail.com", access: "Người dùng", createDate: "2022-03-11", updateDate: "2022-03-14" },
    // ])
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
                
                {
                    accounts.map((account) => (
                        <tr>
                            <td>{account.name}</td>
                            <td>{account.phone}</td>
                            <td>{account.password}</td>
                            <td>{account.email}</td>
                            <td>{account.access}</td>
                            <td>{account.createDate}</td>
                            <td>{account.updateDate}</td>
                            <td className="manager-icon">
                                <i onClick={() => setShowModify(!showModify)}
                                    className="fa fa-pencil-square"
                                    aria-hidden="true"
                                ></i>
                                <i onClick={() => setShowApartment(!showApartment)} className="fa fa-home" aria-hidden="true"></i>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    );
}
