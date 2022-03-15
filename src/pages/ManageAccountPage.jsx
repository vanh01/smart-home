import React from "react";
import ManageAccount from "../components/ManageAccount/ManageAccount";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";

const ManageAccountPage = () => {
    return (
        <>
            <NavbarAdmin />
            <ManageAccount />
        </>
    );
};

export default ManageAccountPage;
