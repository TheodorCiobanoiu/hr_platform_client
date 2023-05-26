import * as React from "react";
import Box from "@mui/material/Box";
import Footer from "./components/footer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {InputLabel} from "@mui/material";
import {Sidebar} from "./components/Sidebar/Sidebar";

const Profile = () => {
    return (
        <div>
            <Sidebar/>
            <br/>
            <div>
                <Container
                    maxWidth="sm"
                    fixed
                    sx={{
                        width: "90%",
                        color: "white",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                        position: "relative",
                        borderRadius: 10,
                    }}
                >
                    <Box sx={{bgcolor: "#ffffff", borderRadius: 10}}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <InputLabel>Username: </InputLabel>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>maria22 </InputLabel>
                            </Grid>
                            <Grid item xs={3}/>
                            <br/>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <InputLabel>First Name: </InputLabel>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>Popescu </InputLabel>
                            </Grid>
                            <Grid item xs={3}/>
                            <br/>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <InputLabel>Last Name: </InputLabel>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>Maria </InputLabel>
                            </Grid>
                            <Grid item xs={3}/>
                            <br/>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <InputLabel>Email: </InputLabel>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>popescumaria@gmail.com </InputLabel>
                            </Grid>
                            <Grid item xs={3}/>
                            <br/>
                            <Grid item xs={3}/>
                            <Grid item xs={3}>
                                <InputLabel>Phone Number: </InputLabel>
                            </Grid>
                            <Grid item xs={3}>
                                <InputLabel>0754123689 </InputLabel>
                            </Grid>
                            <Grid item xs={3}/>
                            <br/>
                        </Grid>
                    </Box>
                </Container>
            </div>
            <Box sx={{mt: 21, mb: 4}}></Box>
            <div>
                <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                >
                </Box>
            </div>
            <Footer/>
        </div>
    );
};
export default Profile;
