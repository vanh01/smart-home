import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as myServerApi from "../../ServerApi";

const Signin = ({ setAccount }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    let navigate = useNavigate();
    const SignIn = async (e) => {
        e.preventDefault();

        // if (formData.username.length < 6 || formData.password.length < 6) {
        //     alert("nhap dung thong tin tai khoan");
        //     return;
        // }
        let account = await myServerApi.getAccount(
            formData.username,
            formData.password
        );
        setAccount(account);
        console.log(account);
        if (account.rules === 1) navigate("/manageaccount");
        else if (account.rules === 2) navigate("/dashboard");
        else {
            alert("Vui lòng nhập đúng thông tin tài khoản và mật khẩu");
        }
        localStorage.setItem("phonenumber", account.phonenumber);
        localStorage.setItem("password", account.password);
        localStorage.setItem("rules", account.rules);
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
            <div className="signin">
                <form className="signin-form" onSubmit={SignIn}>
                    <span className="signin-header">Đăng nhập</span>
                    <div className="signin-username">
                        <span>Số điện thoại</span>
                        <input
                            type="text"
                            name="username"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div className="signin-password">
                        <span>Mật khẩu</span>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <Link to="/forgot">Quên mật khẩu?</Link>
                    <input type="submit" value="Đăng nhập" />
                </form>
            </div>
        </>
    );
};

export default Signin;
