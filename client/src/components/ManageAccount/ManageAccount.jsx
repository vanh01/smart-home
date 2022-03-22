import React from "react";
import ManageApartment from "./ManageApartment";
import Add from "./Add";
import Modify from "./Modify";
import Manager from "./Manager";
import '../../css/manager.css'

const ManageAccount = () => {
    return (
        <div style = {{position: 'relative'}}>
            <Manager />
            <ManageApartment />
            {/* <Add /> */}
            {/* <Modify /> */}
        </div>
    );
};

export default ManageAccount;
