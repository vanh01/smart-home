import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardPage from "./DashboardPage";
import ActivitylogPage from "./ActivityLogPage";
import { apartmentGetOne } from "../ServerApi";

const CustomerPage = ({ account, setAccount }) => {
    const [apartments, setApartments] = useState([]);
    const [apartmentCur, setApartmentCur] = useState("");
    const getData = async () => {
        let apartmentNames = await apartmentGetOne(account.privatekey);
        setApartments(apartmentNames);
        setApartmentCur(apartmentNames[0].apartmentname);
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="dropdown">
                <select
                    onChange={(e) => {
                        console.log(e.target.value);
                        setApartmentCur(e.target.value);
                    }}
                >
                    {apartments.map((apartment, index) => (
                        <option value={apartment.apartmentname} key={index}>
                            {apartment.apartmentname}
                        </option>
                    ))}
                </select>
            </div>
            <Routes>
                <Route
                    path="/dashboard"
                    exact
                    element={
                        <DashboardPage
                            account={account}
                            setAccount={setAccount}
                            apartmentCur={apartmentCur}
                        />
                    }
                />
                <Route
                    path="/activitylog"
                    exact
                    element={
                        <ActivitylogPage
                            account={account}
                            setAccount={setAccount}
                            apartmentCur={apartmentCur}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default CustomerPage;
