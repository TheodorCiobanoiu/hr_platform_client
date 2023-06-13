import React, {useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import Footer from "./components/footer";
import AuthService from "../services/auth.service";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ContentContainer, StyledButton, StyledTextField} from "./components/StyledComponents";
import MenuItem from "@mui/material/MenuItem";


const defaultValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    jobType: ""
};
const AddAccount = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        //e.preventDefault();
        let apiResponse;
        AuthService.register(
            formValues.firstName,
            formValues.lastName,
            formValues.username,
            formValues.phone,
            formValues.email,
            formValues.password,
            formValues.department,
            formValues.jobType
        )
            .then((response) => {
                apiResponse = response.data;
                navigate("/overview", {replace: true});
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Sidebar/>
            <div>
                <ContentContainer>
                    <Box sx={{bgcolor: "#ffffff", borderRadius: 10}}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="center"
                                direction="column"
                            >
                                <Grid item>
                                    <StyledTextField
                                        id="firstName"
                                        name="firstName"
                                        label="First Name: "
                                        type="text"
                                        value={formValues.firstName}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledTextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last name: "
                                        type="text"
                                        value={formValues.lastName}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledTextField
                                        id="username"
                                        name="username"
                                        label="Username: "
                                        type="text"
                                        value={formValues.username}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledTextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledTextField
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        type="text"
                                        value={formValues.phone}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledTextField
                                        id="password"
                                        required
                                        label="Password: "
                                        name="password"
                                        type="password"
                                        value={formValues.password}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Grid>
                                <Grid item>
                                    <StyledTextField
                                        id="department"
                                        required
                                        label="Department: "
                                        name="department"
                                        type="department"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formValues.department}
                                        sx={{width: 225}}
                                        select
                                    >
                                        <MenuItem value={"HR"}> HR </MenuItem>
                                        <MenuItem value={"CAD"}> CAD </MenuItem>
                                        <MenuItem value={"Design"}> Design </MenuItem>
                                        <MenuItem value={"Testing"}> Testing </MenuItem>
                                        <MenuItem value={"Technology"}> Technology </MenuItem>
                                        <MenuItem value={"Marketing"}> Marketing </MenuItem>
                                    </StyledTextField>
                                    <StyledTextField
                                        id="jobType"
                                        required
                                        label="Job title: "
                                        name="jobType"
                                        type="jobType"
                                        onChange={(e) => handleInputChange(e)}
                                        value={formValues.jobType}
                                        sx={{width: 225}}
                                        select
                                    >
                                        <MenuItem value={"HR"}> Human Resources </MenuItem>
                                        <MenuItem value={"JUNIOR_ENGINEER"}> Junior Engineer </MenuItem>
                                        <MenuItem value={"SENIOR_ENGINEER"}> Senior Engineer </MenuItem>
                                        <MenuItem value={"QUALITY_ASSURANCE"}> Quality Assurance </MenuItem>
                                    </StyledTextField>
                                </Grid>
                                <br/>
                                <StyledButton onClick={handleSubmit}>
                                    REGISTER USER
                                </StyledButton>
                            </Grid>
                            <br/>
                        </form>
                    </Box>
                </ContentContainer>
                <Footer/>
            </div>
        </div>
    );
};
export default AddAccount;
