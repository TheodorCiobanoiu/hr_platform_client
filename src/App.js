import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import AddRecommendation from "./pages/AddRecommendation";
import AllRecommendation from "./pages/AllRecommendations";
import AddAccount from "./pages/addAccount";
import DeleteAccount from "./pages/deleteAccount";
import Profile from "./pages/profile";
import AllUsers from "./pages/allUsers";
import YourRecommendations from "./pages/YourRecommendations";
import {Overview} from "./pages/Overview";
import {CreateRequest} from "./pages/CreateRequest";
import {YourRequests} from "./pages/YourRequests";
import {AllRequests} from "./pages/AllRequests";
import {Timesheet} from "./pages/Timesheet";
import {TimesheetData} from "./pages/TimesheetData";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to={"/overview"}/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/overview" element={<Overview/>}></Route>
                <Route path="/recommendations/add" element={<AddRecommendation/>}></Route>
                <Route path="/recommendations/all" element={<AllRecommendation/>}></Route>
                <Route path="/recommendations/user" element={<YourRecommendations/>}></Route>
                <Route path="/admin/add-account" element={<AddAccount/>}></Route>
                <Route path="/admin/delete-account" element={<DeleteAccount/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/admin/users-all" element={<AllUsers/>}></Route>
                <Route path="/request/create" element={<CreateRequest/>}></Route>
                <Route path="/request/user/all" element={<YourRequests/>}></Route>
                <Route path="/request/all" element={<AllRequests/>}></Route>
                <Route path="/timesheet/user" element={<Timesheet/>}></Route>
                <Route path="/timesheet/data" element={<TimesheetData/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
