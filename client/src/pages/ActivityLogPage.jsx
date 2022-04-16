import React from "react";
import NavbarCustomer from "../components/Navbar/NavbarCustomer";
import ActivityLog from "../components/ActivityLog/ActivityLog";

const ActivityLogPage = ({ account, setAccount, apartmentCur }) => {
    return (
        <>
            <NavbarCustomer diarySelected={true} setAccount={setAccount} />
            <ActivityLog account={account} apartmentCur={apartmentCur} />
        </>
    );
};

export default ActivityLogPage;
