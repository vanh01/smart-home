import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faHome } from "@fortawesome/free-solid-svg-icons";

const NavbarCustomer = ({ diarySelected = false, setAccount }) => {
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
                <Link
                    to="/activitylog"
                    id="navbar__activity-log"
                    className={diarySelected ? "navbar__select" : ""}
                >
                    <FontAwesomeIcon icon={faList} className="date__icon" />
                    <input type="button" value="Nhật ký hoạt động" />
                    {diarySelected ? (
                        <div className="navbar__select-curve"></div>
                    ) : (
                        ""
                    )}
                </Link>
                <Link
                    to="/dashboard"
                    id="navbar__dashboard"
                    className={!diarySelected ? "navbar__select" : ""}
                >
                    <FontAwesomeIcon icon={faHome} className="date__icon" />
                    <input type="button" value="Điều khiển" />
                    {!diarySelected ? (
                        <div className="navbar__select-curve"></div>
                    ) : (
                        ""
                    )}
                </Link>
            </div>
        </>
    );
};

export default NavbarCustomer;
