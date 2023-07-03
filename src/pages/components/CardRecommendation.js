import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {StyledCard} from "./StyledComponents";
import React from "react";

export const CardRecommendation = (prop) => {

    const recommendation = prop.recommendation;

    return (
        <StyledCard>
            <Grid container>
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{
                            marginTop: "1em",
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            fontWeight: "bold",
                            color: "#15171c"
                        }}
                        >
                            Candidate name:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {recommendation.candidateFirstName} {recommendation.candidateLastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{
                            marginTop: "1em",
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            fontWeight: "bold",
                            color: "#15171c"
                        }}
                        >
                            Email:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {recommendation.candidateEmail}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{
                            marginTop: "1em",
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            fontWeight: "bold",
                            color: "#15171c"
                        }}
                        >
                            Phone:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {recommendation.candidatePhoneNumber}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{
                            marginTop: "1em",
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            fontWeight: "bold",
                            color: "#15171c"
                        }}
                        >
                            Employee who recommended:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {recommendation.userFullName}
                        </Typography>
                        <Typography variant="body1" style={{
                            marginTop: "1em",
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            fontWeight: "bold",
                            color: "#15171c"
                        }}
                        >
                            Department:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {recommendation.department}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" style={{
                            marginTop: "1em",
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            fontWeight: "bold",
                            color: "#15171c"
                        }}
                        >
                            Job title:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {recommendation.jobTitle}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </StyledCard>
    )
}
