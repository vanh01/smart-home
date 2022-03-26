import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faHome } from '@fortawesome/free-solid-svg-icons'

const NavbarCustomer = ({diarySelected = false}) => {
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
                <Link to="/">
                    <input type="button" value="Đăng xuất" />
                </Link>
                <Link to="/activitylog" id="navbar__activity-log" className={diarySelected ? "navbar__select" : ""}>
                    <FontAwesomeIcon icon={faList} className="date__icon" />
                    <input type="button" value="Nhật ký hoạt động" />
                    {diarySelected ? <div className="navbar__select-curve"></div> : ''}
                </Link>
                <Link to="/dashboard" id="navbar__dashboard" className={!diarySelected ? "navbar__select" : ""}>
                    <FontAwesomeIcon icon={faHome} className="date__icon" />
                    <input type="button" value="Điều khiển" />
                    {!diarySelected ? <div className="navbar__select-curve"></div> : ''}
                </Link>
            </div>
        </>
    );
};

export default NavbarCustomer;
