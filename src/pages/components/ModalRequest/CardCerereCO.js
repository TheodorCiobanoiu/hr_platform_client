import {StyledCard} from "../StyledComponents";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

export const CardCerereCO = (prop) => {

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
                            Request type
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.requestType}
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
                            Start Date:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.startDate}
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
                            End Date:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.endDate}
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
                            Number of business days:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.noOfDays}
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
                            Status:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.status}
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
                            Current vacation days:
                        </Typography>
                        <Typography variant="body1" style={{
                            fontSize: "1em",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            {request.userDTO.userDetailsDTO.noOfVacationDays}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </StyledCard>
    )
}
