import {Sidebar} from "./components/Sidebar/Sidebar";
import {styled} from "@mui/system";
import UsersService from "../services/users.service";
import {OverviewBanner} from "./components/Overview/OverviewBanner";
import {CardActions, Paper} from "@mui/material";
import Footer from "./components/footer";
import {GreetingBanner} from "./components/Overview/GreetingBanner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import AdminService from "../services/admin.service";

const ContentContainer = styled(Paper)`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)({
    borderColor: '#15171c',
    borderRadius: 10,
    padding: "18px 36px",
    fontSize: "18px",
    color: "#15171c",
    position: "relative",
    borderWidth: 2,
    backgroundColor: "rgba(99,44,228,0.4)",
    '&:hover': {
        backgroundColor: "rgba(99,44,228,0.7)",
        borderColor: '#632ce4',
        borderWidth: 2,
        color: '#15171c',
    }
});

const StyledCard = styled(Card)({
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});


export const Overview = () => {

    const [overviewData, setOverviewData] = React.useState({});

    React.useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate();

    const currentUser = UsersService.getFullUser();
    const userFullName = currentUser.firstName + " " + currentUser.lastName;

    const getData = async () => {
        const data = await AdminService.getOverviewMessage(currentUser.userID);
        data.timeTillNextVacationDay = (data.timeTillNextVacationDay === null ? "There are no messages for you at this moment" : data.timeTillNextVacationDay);
        setOverviewData(data);
        console.log(data);
    }

    const handleOngoingRequestsButton = () => {
        navigate("/request/user/all", {replace: true});
    };

    const handleCreateRequestButton = () => {
        navigate("/request/create", {replace: true});
    };

    const handleFillTimesheetButton = () => {
        navigate("/timesheet/user", {replace: true});
    }

    return (
        <>

            <Sidebar/>
            <OverviewBanner/>
            <ContentContainer>

                <Grid container spacing={1}>

                    <GreetingBanner name={userFullName}/>

                    <Grid item xs={4}>
                        <StyledCard>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" style={{
                                            marginBottom: "1em",
                                            fontFamily: "Varela Round",
                                            fontWeight: "bold",
                                            color: "#15171c"
                                        }}
                                        >
                                            News and info
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" style={{
                                            fontSize: "1em",
                                            fontFamily: "Varela Round",
                                            color: "#15171c"
                                        }}
                                        >
                                            {overviewData.timeTillNextVacationDay}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </StyledCard>
                    </Grid>


                    <Grid item xs={4}>
                        <StyledCard>
                            <CardContent>
                                <Grid item xs={12}>
                                    <Typography variant="h5" style={{
                                        marginBottom: "1em",
                                        fontFamily: "Varela Round",
                                        fontWeight: "bold",
                                        color: "#15171c"
                                    }}
                                    >
                                        Your requests
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" style={{
                                        fontSize: "1em",
                                        fontFamily: "Varela Round",
                                        color: "#15171c"
                                    }}
                                    >
                                        {overviewData.noOfOpenRequests}
                                    </Typography>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <StyledButton
                                            type="submit"
                                            fullWidth
                                            variant="filledTonal"
                                            onClick={handleOngoingRequestsButton}
                                        >
                                            See ongoing requests
                                        </StyledButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledButton
                                            type="submit"
                                            fullWidth
                                            variant="filledTonal"
                                            onClick={handleCreateRequestButton}
                                        >
                                            Create a new request
                                        </StyledButton>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={4}>
                        <StyledCard>
                            <CardContent>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" style={{
                                            marginBottom: "1em",
                                            fontFamily: "Varela Round",
                                            fontWeight: "bold",
                                            color: "#15171c"
                                        }}
                                        >
                                            Timesheets
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" style={{
                                            fontSize: "1em",
                                            fontFamily: "Varela Round",
                                            color: "#15171c"
                                        }}
                                        >
                                            {overviewData.warningForTimesheet}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid item xs={12}>
                                    <StyledButton
                                        type="submit"
                                        fullWidth
                                        variant="filledTonal"
                                        onClick={handleFillTimesheetButton}
                                    >
                                        Fill timesheet
                                    </StyledButton>
                                </Grid>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                </Grid>
            </ContentContainer>
            <Footer/>

        </>
    )
}
