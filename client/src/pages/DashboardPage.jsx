import React from "react";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = ({ account, setAccount, apartmentCur }) => {
    return (
        <>
            <NavbarCustomer diarySelected={false} setAccount={setAccount} />
            <Dashboard account={account} apartmentCur={apartmentCur} />
        </>
    );
};

export default DashboardPage;
