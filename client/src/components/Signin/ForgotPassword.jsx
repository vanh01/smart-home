import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as myServerApi from "../../ServerApi";

const ForgotPassword = () => {
    const [phonenumber, setPhonenumber] = useState("");
    const Submit = async (e) => {
        e.preventDefault();
        let account = await myServerApi.forgotPassword(phonenumber);
        if (account.password === undefined) {
            alert("Vui lòng nhập đúng số điện thoại");
            return;
        }
        alert(`Mật khẩu của bạn là : ${account.password}`);
    };

    return (
        <>
            <div className="forgot">
                <form className="forgot-form" onSubmit={Submit}>
                    <span className="forgot-header">Quên mật khẩu</span>
                    <div className="forgot-username">
                        <span>Số điện thoại</span>
                        <input
                            type="text"
                            required
                            onChange={(e) => {
                                setPhonenumber(e.target.value);
                            }}
                        />
                    </div>
                    <input type="submit" value="Gửi mật khẩu cũ" />
                    <Link to="/signin">Đăng nhập?</Link>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
