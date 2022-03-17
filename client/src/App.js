import SigninPage from "./pages/SigninPage"
import DashboardPage from "./pages/DashboardPage"
import ActivitylogPage from "./pages/ActivityLogPage"
import ManageAccountPage from "./pages/ManageAccountPage";
import { Route, Routes } from "react-router-dom";
import './css/activity.css'
import './css/signin.css'
import './css/style.css'
import './css/navbar.css'
import './css/dashboard.css'
import './css/custom.css'

function App() {
    return (
        <Routes>
            <Route path="/signin" exact element={<SigninPage />} />
            <Route path="/dashboard" exact element={<DashboardPage />} />
            <Route path="/activitylog" exact element={<ActivitylogPage />} />
            <Route path="/manageaccount" exact element={<ManageAccountPage />} />
        </Routes>
    );
}

export default App;
