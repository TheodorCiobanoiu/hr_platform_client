import React from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";

import {Step, StepLabel, Stepper} from "@mui/material";
import authHeader from "../../services/auth-header";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import {StyledButton, StyledConnector, StyledStepIcon, StyledTextField} from "./StyledComponents";
import Stack from "@mui/material/Stack";
import {CardRecommendation} from "./CardRecommendation";

const steps = [
    'Not Reviewed',
    'Reviewed',
    'In progress',
    'Accepted',
    'Rejected'
];

export default function ModalRecommendation(props) {
    let answers = props.recommendation.answerDTOS;
    let recommendation = props.recommendation;
    console.log(recommendation);

    const handleClick = () => {
        axios.get("http://localhost:8082/file/downloadFile/" + recommendation.cvFileId, {
            headers: authHeader(),
            responseType: 'blob'
        })
            .then((response) => {
                window.open(URL.createObjectURL(response.data));
            });
    }

    const getActiveStep = () => {
        switch (recommendation.progressStatus) {
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
        <Box sx={{width: '100%', height: '90vh'}}>

            <Typography variant="h4" style={{
                marginTop: "1em",
                marginBottom: "1em",
                fontSize: "2em",
                fontWeight: "bold",
                fontFamily: "Varela Round",
                color: "#15171c"
            }}
            >
                Recommendation #{props.recommendation.id},
                Candidate {recommendation.candidateFirstName} {recommendation.candidateLastName}
            </Typography>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Stepper alternativeLabel activeStep={getActiveStep()} connector={<StyledConnector/>}
                         sx={{width: '100%'}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={StyledStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Grid container justifyContent="center">
                    <Grid item xs={6}>
                        <CardRecommendation recommendation={props.recommendation}/>
                    </Grid>
                </Grid>
                <Grid container>
                    {answers.map((answer) => (
                        <Grid item xs={4}>
                            <Card sx={{height: 300, borderSize: '2'}}>
                                <CardContent>
                                    <Typography variant="h5" style={{
                                        marginTop: "1em",
                                        marginBottom: "1em",
                                        fontFamily: "Varela Round",
                                        fontWeight: "bold",
                                        color: "#15171c"
                                    }}
                                    >
                                        {answer.question.questionBody}
                                    </Typography>
                                    <Typography variant="body1" style={{
                                        marginTop: "1em",
                                        marginBottom: "1em",
                                        fontFamily: "Varela Round",
                                        color: "#15171c"
                                    }}
                                    >
                                        {answer.answerBody}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <StyledButton onClick={handleClick}>
                    Download CV
                </StyledButton>

                {props.pathName !== "/yourRecommendation" && (
                    <StyledTextField
                        sx={{width: 400, marginBottom: 50}}
                        select
                        label="Change status"
                        onChange={(e) => props.handleInputChange(e)}
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

                    </StyledTextField>
                )}
            </Stack>
        </Box>
    );
}
