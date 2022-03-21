import React from "react";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import ActivityLog from "../components/ActivityLog/ActivityLog";

const ActivityLogPage = () => {
    return (
        <>
            <NavbarCustomer diarySelected = {true}/>
            <ActivityLog />
        </>
    );
};

export default ActivityLogPage;
