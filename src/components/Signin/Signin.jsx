import React, { useState } from "react";
import { useNavigate } from "react-router";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    console.log("1");
    const SignIn = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin")
            navigate("/manageaccount");
        else navigate("/dashboard");
        console.log("test");
    };

    return (
        <>
            <div className="signin">
                <form className="signin-form" onSubmit={SignIn}>
                    <span className="signin-header">Đăng nhập</span>
                    <div className="signin-username">
                        <span>Số điện thoại</span>
                        <input
                            type="text"
                            required
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="signin-password">
                        <span>Mật khẩu</span>
                        <input
                            type="password"
                            name=""
                            id=""
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <input type="button" value="quên?" />
                    <input type="submit" value="Đăng nhập" />
                </form>
            </div>
        </>
    );
};

export default Signin;
