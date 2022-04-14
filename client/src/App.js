import SigninPage from "./pages/SigninPage"
import DashboardPage from "./pages/DashboardPage"
import ActivitylogPage from "./pages/ActivityLogPage"
import ManageAccountPage from "./pages/ManageAccountPage";
import ForgotPassword from "./components/Signin/ForgotPassword";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import * as myServerApi from "./ServerApi";
import './css/activity.css'
import './css/signin.css'
import './css/style.css'
import './css/navbar.css'
import './css/dashboard.css'
import './css/custom.css'
import './css/forgot.css'
import './css/apartment.css'
import './css/add.css'
import './css/modify.css'
import './css/manager.css'
function App() {
    const [account, setAccount] = useState({});
    let user = <Routes>
                <Route path="/dashboard" exact element={<DashboardPage account={account} setAccount={setAccount} />} />
                <Route path="/activitylog" exact element={<ActivitylogPage account={account} setAccount={setAccount} />} />
                {/* <Route path="*" element={() => <h1>404 not found</h1>} /> */}
            </Routes>;
    
    let admin = <Routes>
                <Route path="/manageaccount" exact element={<ManageAccountPage account={account} setAccount={setAccount} />} />
                {/* <Route path="*" element={() => <h1>404 not found</h1>} /> */}
            </Routes>;

    let none =
        <Routes>
            <Route path="/signin" exact element={<SigninPage setAccount={setAccount} />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/forgot" exact element={<ForgotPassword />} />
            {/* <Route path="*" element={() => <h1>404 not found</h1>} /> */}
        </Routes>;

    // let temp = none;

    const fetch = async () => {
        let account = await myServerApi.getAccount(
            localStorage.getItem("phonenumber"),
            localStorage.getItem("password")
        );
        setAccount(account);
    }

    useEffect(() => {
        fetch();
    }, [])
    
    if (account.rules === 1) return admin;
    else if (account.rules === 2) return user;
    else return none;
}

export default App;
