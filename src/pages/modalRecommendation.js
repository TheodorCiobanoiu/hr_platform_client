import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";

import {InputLabel, Step, StepLabel, Stepper} from "@mui/material";
import authHeader from "../services/auth-header";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";

const steps = [
    'Not Reviewed',
    'Reviewed',
    'In progress',
    'Accepted',
    'Rejected'
];


export default function ModalRecommendation(props) {
    console.log(props.pathName);
    let answers = props.recommendation.answerDTOS;
    console.log(answers);
    let candidateFirstName = props.recommendation.candidateFirstName;
    let candidateLastName = props.recommendation.candidateLastName;
    let candidateEmail = props.recommendation.candidateEmail;
    let candidatePhoneNumber = props.recommendation.candidatePhoneNumber;
    let progressStatus = props.recommendation.progressStatus;
    let cvFileId = props.recommendation.cvFileId;


    const handleClick = () => {
        axios.get("http://localhost:8082/file/downloadFile/" + cvFileId, {headers: authHeader(), responseType: 'blob'})
            .then((response) => {
                window.open(URL.createObjectURL(response.data));
            });
    }

    const getActiveStep = () => {
        switch (progressStatus) {
            case "Not_Reviewed":
                return 0;
            case "Reviewed":
                return 1;
            case "In_Progress":
                return 2;
            case "Accepted":
                return 3;
            case "Rejected":
                return 4;
        }
    };


    return (
        <div style={{marginTop: "30px"}}>
            <Box sx={{width: "100%", marginBottom: "30px"}}>
                <Stepper activeStep={getActiveStep()} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <InputLabel>First Name: </InputLabel>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel>{candidateFirstName} </InputLabel>
                </Grid>
                <Grid item xs={3}/>
                <br/>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <InputLabel>Last Name: </InputLabel>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel>{candidateLastName} </InputLabel>
                </Grid>
                <Grid item xs={3}/>
                <br/>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <InputLabel>Email: </InputLabel>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel>{candidateEmail} </InputLabel>
                </Grid>
                <Grid item xs={3}/>
                <br/>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <InputLabel>Phone Number: </InputLabel>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel>{candidatePhoneNumber} </InputLabel>
                </Grid>
                <Grid item xs={3}/>
                <br/>
                <br/>
                {answers.map((answer) => (
                    <Grid item xs={4}>
                        <Card sx={{maxWidth: 400, minHeight: 250}}
                              style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {answer.question.questionBody}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="h8"
                                    component="div"
                                >
                                    {answer.answerBody}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                ))}
                <br/>
                <br/>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <Button
                        style={{
                            borderRadius: 35,
                            padding: "18px 36px",
                            fontSize: "18px",
                            color: "black",
                            borderWidth: 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        variant="outlined"
                        sx={{backgroundColor: "white", height: 40}}
                        component="label"
                        onClick={handleClick}
                    >
                        Download CV
                    </Button>
                </Grid>
                <Grid item xs={4}/>
                <br/>
                <br/>
                <br/>

                <Grid item xs={4}/>
                <Grid item xs={4}>
                    {props.pathName !== "/yourRecommendation" && (
                        <TextField
                            id="filled-select-answer"
                            select
                            label="Change status"
                            onChange={(e) => props.handleInputChange(e)}
                            variant="filled"
                            fullWidth={true}
                            name="Change status"
                        >
                            <MenuItem value="Reviewed">
                                Reviewed
                            </MenuItem>

                            <MenuItem value="In progress">
                                In progress
                            </MenuItem>

                            <MenuItem value="Accepted">
                                Accepted
                            </MenuItem>

                            <MenuItem value="Rejected">
                                Rejected
                            </MenuItem>

                        </TextField>
                    )}
                </Grid>
                <Grid item xs={4}/>
            </Grid>

            <br/>

            <br/>
        </div>
    );
}
