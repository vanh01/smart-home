import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Signin = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    let navigate = useNavigate();
    console.log("1");
    const SignIn = (e) => {
        e.preventDefault();

        if (formData.username.length < 6 || formData.password.length < 6) {
            alert("nhap dung thong tin tai khoan");
            return;
        }

        if (formData.username === "admin" && formData.password === "admin")
            navigate("/manageaccount");
        else navigate("/dashboard");
        console.log("test");
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
