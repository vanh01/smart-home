import React from "react";
import { Link } from "react-router-dom";

const NavbarCustomer = () => {
    return (
        <>
            <div className="navbar">
                <Link to="/signin">
                    <input type="button" value="Sign Out" />
                </Link>
                <Link to="/activitylog">
                    <input type="button" value="Activity Log" />
                </Link>
                <Link to="/dashboard">
                    <input type="button" value="Dashboard" />
                </Link>
            </div>
        </>
    );
};

export default NavbarCustomer;
