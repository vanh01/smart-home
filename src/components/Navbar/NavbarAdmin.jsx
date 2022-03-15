import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
    return (
        <>
            <div className="navbar">
                <Link to="/signin">
                    <input type="button" value="Đăng xuất" />
                </Link>
                <Link to="/manageaccount">
                    <input type="button" value="Quản lý tài khoản" />
                </Link>
            </div>
        </>
    );
};

export default NavbarAdmin;
