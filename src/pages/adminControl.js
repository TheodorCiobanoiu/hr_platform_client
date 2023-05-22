import "./login.css";
import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Footer from "./components/footer";
import Stack from "@mui/material/Stack";
import {Sidebar} from "./components/Sidebar/Sidebar";
//const settings = ["Profile", "Logout"];
//const today = Date.getFullYear() + "-" + Date.getMonth() + "-" + Date.getDate();
/*const defaultValues = {
  name: "",
  date: "10/04/2022",
  gender: "",
  os: "",
  favoriteNumber: 0,
};
*/
export default function Login() {
    const navigate = useNavigate();

    return (
        <div>
            <Sidebar/>
            <br/>
            <div>
                <Box sx={{width: "30%", margin: "auto"}}>
                    <Stack spacing={2}>
                        <Button
                            style={{
                                borderRadius: 35,
                                padding: "18px 36px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: "white"}}
                            href="/admin/add-account"
                        >
                            Register account
                        </Button>
                        <Button
                            style={{
                                borderRadius: 35,
                                padding: "18px 36px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: "white"}}
                            href="admin/delete-account"
                        >
                            Delete account
                        </Button>
                        <Button
                            style={{
                                borderRadius: 35,
                                padding: "18px 36px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: "white"}}
                            href="/addQuestion"
                        >
                            Add questions
                        </Button>
                        <Button
                            style={{
                                borderRadius: 35,
                                padding: "18px 36px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: "white"}}
                            href="/admin/users-all"
                        >
                            See all users
                        </Button>
                    </Stack>
                </Box>
            </div>
            <br/>
            <br/>
            <div>
                <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                    <Button
                        style={{
                            borderRadius: 35,
                            padding: "18px 36px",
                            fontSize: "18px",
                            color: "black",
                            borderWidth: 4,
                        }}
                        variant="outlined"
                        sx={{backgroundColor: "white", height: 40}}
                        onClick={() => navigate(-1)}
                    >
                        Go back
                    </Button>
                </Box>
            </div>
            <Box sx={{mt: 19, mb: 0}}>
                <Footer/>
            </Box>
        </div>
    );
}
