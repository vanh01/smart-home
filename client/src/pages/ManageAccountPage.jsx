import React from "react";
import ManageAccount from "../components/ManageAccount/ManageAccount";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";

const ManageAccountPage = ({ account, setAccount }) => {
    return (
        <>
            <NavbarAdmin setAccount={setAccount} />
            <ManageAccount account={account} />
        </>
    );
};

export default ManageAccountPage;
