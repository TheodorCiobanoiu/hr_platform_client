import styled from "styled-components";
import LiveDateTime from "./LiveDateTime";
import Grid from "@mui/material/Grid";

const GreetingText = styled.h2`
  font-size: 2em;
  font-weight: bold;
  font-family: 'Varela Round', sans-serif;
  color: #15171c;
`;

const Greeting = ({username}) => (
    <GreetingText variant="h2">
        Hello there, {username}
    </GreetingText>
);

export const GreetingBanner = ({name}) => {
    return (
        <>
            <Grid item xs={6}>
                <Greeting username={name}/>
            </Grid>
            <Grid item xs={6}>
                <LiveDateTime/>
            </Grid>
        </>
    )
}
