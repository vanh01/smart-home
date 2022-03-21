import SigninPage from "./pages/SigninPage"
import DashboardPage from "./pages/DashboardPage"
import ActivitylogPage from "./pages/ActivityLogPage"
import ManageAccountPage from "./pages/ManageAccountPage";
import ForgotPassword from "./components/Signin/ForgotPassword";
import AddPage from "./pages/AddPage"
import ModifyPage from "./pages/ModifyPage"
import { Route, Routes } from "react-router-dom";
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
function App() {
    return (
        <Routes>
            <Route path="/signin" exact element={<SigninPage />} />
            <Route path="/forgot" exact element={<ForgotPassword />} />
            <Route path="/dashboard" exact element={<DashboardPage />} />
            <Route path="/activitylog" exact element={<ActivitylogPage />} />
            <Route path="/manageaccount" exact element={<ManageAccountPage />} />
            <Route path="/add" exact element={<AddPage />} />
            <Route path="/modify" exact element={<ModifyPage />} />
            <Route path="/manager" exact element={<ManagerPage />} />
        </Routes>
    );
}

export default App;
