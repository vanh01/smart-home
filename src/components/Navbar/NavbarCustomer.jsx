import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarCustomer = () => {
    const [apartment, setApartment] = useState("");

    function show(e) {
        setApartment(e.target.innerText);
        let dropdown = document.querySelector(".dropdown");
        dropdown.classList.toggle("active");
    }

    useEffect(() => {
        setApartment(
            document.querySelector(".option > li:nth-child(1)").innerText
        );
    }, []);

    return (
        <>
            <div className="dropdown">
                <input
                    type="text"
                    className="dropdown-text"
                    value={apartment}
                    readOnly
                    onClick={() => {
                        let dropdown = document.querySelector(".dropdown");
                        dropdown.classList.toggle("active");
                    }}
                />
                <ul className="option">
                    <li onClick={show}>Căn hộ 1</li>
                    <li onClick={show}>Căn hộ 2</li>
                    <li onClick={show}>Căn hộ 3</li>
                    <li onClick={show}>Căn hộ 4</li>
                    <li onClick={show}>Căn hộ 5</li>
                </ul>
            </div>
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
