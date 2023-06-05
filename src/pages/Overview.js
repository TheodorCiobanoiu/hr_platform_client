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

    const navigate = useNavigate();

    const currentUser = UsersService.getFullUser();
    const userFullName = currentUser.firstName + " " + currentUser.lastName;

    const handleOngoingRequestsButton = () => {
        navigate("/request/user/all", {replace: true});
    };

    const handleCreateRequestButton = () => {
        navigate("/request/create", {replace: true});
    };

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
                                        <Typography gutterBottom variant="h5" component="div">
                                            News and info
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Content
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
                                    <Typography gutterBottom variant="h5" component="div">
                                        Your requests
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>
                                        Content 2
                                    </Typography>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Grid item xs={6}>
                                    <StyledButton
                                        type="submit"
                                        fullWidth
                                        variant="filledTonal"
                                        onClick={handleOngoingRequestsButton}
                                    >
                                        See ongoing requests
                                    </StyledButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledButton
                                        type="submit"
                                        fullWidth
                                        variant="filledTonal"
                                        onClick={handleCreateRequestButton}
                                    >
                                        Create a new request
                                    </StyledButton>
                                </Grid>
                            </CardActions>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={4}>
                        <StyledCard>
                            <CardContent>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Work time
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>
                                        Content 3
                                    </Typography>
                                </Grid>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>
            </ContentContainer>
            <Footer/>

        </>
    )
}
