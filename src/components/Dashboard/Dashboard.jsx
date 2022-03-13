import React from "react";

const Dashboard = () => {
    return (
        <>
            <div className="dashboard">
                <select>
                    <option value="Can ho 1">Can ho 1</option>
                    <option value="Can ho 2">Can ho 2</option>
                    <option value="Can ho 3">Can ho 3</option>
                </select>
                <div className="dashboard-container">
                    <div className="dashboard-light">
                        <h1>Hệ thống đèn</h1>
                    </div>
                    <div className="dashboard-air-conditioner"></div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
