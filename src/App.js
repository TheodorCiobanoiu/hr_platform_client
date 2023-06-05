import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import AddRecommendation from "./pages/AddRecommendation";
import AllRecommendation from "./pages/AllRecommendations";
import AdminControl from "./pages/adminControl";
import AddAccount from "./pages/addAccount";
import DeleteAccount from "./pages/deleteAccount";
import Profile from "./pages/profile";
import AddQuestion from "./pages/addQuestion";
import AllUsers from "./pages/allUsers";
import YourRecommendations from "./pages/YourRecommendations";
import {Overview} from "./pages/Overview";
import {CreateRequest} from "./pages/CreateRequest";
import {YourRequests} from "./pages/YourRequests";
import {AllRequests} from "./pages/AllRequests";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to={"/overview"}/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/overview" element={<Overview/>}></Route>
                <Route path="/recommendations/add" element={<AddRecommendation/>}></Route>
                <Route path="/recommendations/all" element={<AllRecommendation/>}></Route>
                <Route path="/admin" element={<AdminControl/>}></Route>
                <Route path="/yourRecommendation" element={<YourRecommendations/>}></Route>
                <Route path="/admin/add-account" element={<AddAccount/>}></Route>
                <Route path="/admin/delete-account" element={<DeleteAccount/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/addQuestion" element={<AddQuestion/>}></Route>
                <Route path="/admin/users-all" element={<AllUsers/>}></Route>
                <Route path="/request/create" element={<CreateRequest/>}></Route>
                <Route path="/request/user/all" element={<YourRequests/>}></Route>
                <Route path="/request/all" element={<AllRequests/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
