import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Footer from "./footer";
import Header from "./header";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";

const user = AuthService.getCurrentUser();
const role = user.roles[0];

export default function Content() {

    const handleTestButton = () => {
        axios.get("http://localhost:8082/pdf-generate/test-file/", {headers: authHeader(), responseType: 'blob'})
            .then((response) => {
                window.open(URL.createObjectURL(response.data));
            });
    };

    return (
        <div>
            <Header/>
            <br/>
            <div>
                <Box sx={{width: "30%", margin: "auto", color: "#b34454"}}>
                    <Stack spacing={4} sx={{mt: 4}}>
                        <Button
                            style={{
                                borderRadius: 35,
                                padding: "18px 36px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: 'white'}}
                            href="/completeRecommendation"
                        >
                            Add recommendation
                        </Button>
                        <Button
                            style={{
                                weight: 200,
                                borderRadius: 35,
                                padding: "18px 32px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: 'white'}}
                            href="/yourRecommendation"
                        >
                            See your recommendations
                        </Button>
                        {(role === "ROLE_HR" || role === "ROLE_ADMIN") && (
                            <Button
                                style={{
                                    borderRadius: 35,
                                    padding: "18px 36px",
                                    fontSize: "18px",
                                    color: "black",
                                    borderWidth: 4,
                                }}
                                variant="outlined"
                                sx={{backgroundColor: 'white'}}
                                href="/viewRecommendations"
                            >
                                See all recommendations
                            </Button>
                        )}
                        {role === "ROLE_ADMIN" && (
                            <Button
                                style={{
                                    borderRadius: 35,
                                    padding: "18px 36px",
                                    fontSize: "18px",
                                    color: "black",
                                    borderWidth: 4,
                                }}
                                variant="outlined"
                                sx={{backgroundColor: 'white'}}
                                href="/admin"
                            >
                                Admin control
                            </Button>
                        )}
                        <Button
                            style={{
                                borderRadius: 35,
                                padding: "18px 36px",
                                fontSize: "18px",
                                color: "black",
                                borderWidth: 4,
                            }}
                            variant="outlined"
                            sx={{backgroundColor: 'white'}}
                            onClick={handleTestButton}
                        >
                            TEST BUTTON
                        </Button>
                    </Stack>
                </Box>
            </div>
            <Box sx={{mt: 21, mb: 0}}>
                <Footer/>
            </Box>
        </div>
    );
};

