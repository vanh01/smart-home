import React from "react";
import { Link } from "react-router-dom";

const NavbarCustomer = () => {
    return (
        <>
            <div className="navbar">
                <Link to="/signin">
                    <input type="button" value="Đăng xuất" />
                </Link>
                <Link to="/activitylog">
                    <input type="button" value="Nhật ký hoạt động" />
                </Link>
                <Link to="/dashboard">
                    <input type="button" value="Điều khiển" />
                </Link>
            </div>
        </>
    );
};

export default NavbarCustomer;
