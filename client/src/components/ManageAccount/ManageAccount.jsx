import React from "react";
import Manager from "./Manager";
import "../../css/manager.css";

const ManageAccount = ({ account, setAccount }) => {
    return (
        <>
            <Manager account={account} setAccount={setAccount} />
        </>
    );
};

export default ManageAccount;
