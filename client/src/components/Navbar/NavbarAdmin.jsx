import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
    return (
        <>
            <div className="navbar">
                <Link to="/signin">
                    <input type="button" value="Đăng xuất" />
                </Link>
                <Link to="/manageaccount" className="navbar__select">
                    <input type="button" value="Quản lý tài khoản" />
                    <div className="navbar__select-curve"></div>
                </Link>
            </div>
        </>
    );
};

export default NavbarAdmin;
