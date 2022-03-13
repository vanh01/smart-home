import SigninPage from "./pages/SigninPage"
import DashboardPage from "./pages/DashboardPage"
import { Route, Routes } from "react-router-dom";
import './css/signin.css'
import './css/style.css'
import './css/navbar.css'
import './css/dashboard.css'

function App() {
    return (
        <Routes>
            <Route path="/signin" exact element={<SigninPage />} />
            <Route path="/dashboard" exact element={<DashboardPage />} />
        </Routes>
    );
}

export default App;
