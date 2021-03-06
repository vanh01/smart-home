import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavbarAdmin = ({ setAccount }) => {
    return (
        <>
            <div className="navbar">
                <Link
                    to="/signin"
                    onClick={() => {
                        setAccount({});
                        localStorage.setItem("phonenumber", "");
                        localStorage.setItem("password", "");
                        localStorage.setItem("rules", "");
                    }}
                >
                    <input type="button" value="Đăng xuất" />
                </Link>
                <Link to="/manageaccount" className="navbar__select">
                    <FontAwesomeIcon icon={faUser} />
                    <input type="button" value="Quản lý tài khoản" />
                    <div className="navbar__select-curve"></div>
                </Link>
            </div>
        </>
    );
};

export default NavbarAdmin;
