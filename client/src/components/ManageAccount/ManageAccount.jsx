import React from "react";
import Manager from "./Manager";
import "../../css/manager.css";

const ManageAccount = ({ account }) => {
    return (
        <>
            <Manager account={account} />
        </>
    );
};

export default ManageAccount;
