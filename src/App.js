import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import Content from "./pages/content";
import AddRecommendation from "./pages/addRecommendation";
import AllRecommendation from "./pages/allRecommendations";
import AdminControl from "./pages/adminControl";
import AddAccount from "./pages/addAccount";
import DeleteAccount from "./pages/deleteAccount";
import Profile from "./pages/profile";
import AddQuestion from "./pages/addQuestion";
import AllUsers from "./pages/allUsers";
import YourRecommendations from "./pages/yourRecommendations";
import {Overview} from "./pages/Overview";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to={"/login"}/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/overview" element={<Overview/>}></Route>
                <Route path="/content" element={<Content/>}></Route>
                <Route path="/recommendations/add" element={<AddRecommendation/>}></Route>
                <Route path="/recommendations/all" element={<AllRecommendation/>}></Route>
                <Route path="/admin" element={<AdminControl/>}></Route>
                <Route path="/yourRecommendation" element={<YourRecommendations/>}></Route>
                <Route path="/admin/add-account" element={<AddAccount/>}></Route>
                <Route path="/admin/delete-account" element={<DeleteAccount/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/addQuestion" element={<AddQuestion/>}></Route>
                <Route path="/admin/users-all" element={<AllUsers/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
