import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {StyledCard} from "../StyledComponents";
import React from "react";

export const CardEmployeeDetails = (prop) => {

    const request = prop.clickedRequest;

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
                            Name:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.userDTO.firstName} {request.userDTO.lastName}
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
                            {request.userDTO.email}
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
                            {request.userDTO.phone}
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
                            Job Title:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.userDTO.userDetailsDTO.jobTitle}
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
                            Department:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.userDTO.userDetailsDTO.department}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </StyledCard>
    )
}
