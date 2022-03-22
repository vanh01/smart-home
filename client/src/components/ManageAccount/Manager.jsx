// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { useState } from "react";

const Manager = () => {
    return (
        <>
            <div className="container">
                <div className="space"></div>
                <div className="head-manager prefix">
                    {/* <button className="btn btn-primary add-account float-start" type="button">
                    Thêm mới +
                </button> */}
                    <button type="button" className="add">
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

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {/* /.card */}
                            <div className="card">
                                {/* /.card-header */}
                                <div className="card-body">
                                    <ShowTable />
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
        </>
    );
};
export default Manager;

function ShowTable() {
    return (
        <table id="example1" className="table table-bordered table-striped">
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
                    <td className="icon">
                        <i
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i className="fa fa-home" aria-hidden="true"></i>
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
                    <td className="icon">
                        <i
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i className="fa fa-home" aria-hidden="true"></i>
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
                    <td className="icon">
                        <i
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                        ></i>
                        <i className="fa fa-home" aria-hidden="true"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
