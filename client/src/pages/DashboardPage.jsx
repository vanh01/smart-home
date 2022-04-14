import React from "react";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = ({ account, setAccount }) => {
    return (
        <>
            <NavbarCustomer diarySelected={false} setAccount={setAccount} />
            <Dashboard account={account} />
        </>
    );
};

export default DashboardPage;
