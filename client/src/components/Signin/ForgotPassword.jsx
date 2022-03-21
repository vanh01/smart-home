import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <>
            <div className="forgot">
                <form className="forgot-form">
                    <span className="forgot-header">Quên mật khẩu</span>
                    <div className="forgot-username">
                        <span>Số điện thoại</span>
                        <input type="text" required />
                    </div>
                    <input type="submit" value="Gửi mật khẩu cũ" />
                    <Link to="/signin">Đăng nhập?</Link>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
