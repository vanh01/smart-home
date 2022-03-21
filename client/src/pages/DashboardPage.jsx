import React from "react";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage = () => {
    return (
        <>
            <NavbarCustomer diarySelected={false} />
            <Dashboard />
        </>
    );
};

export default DashboardPage;
