import {Sidebar} from "./components/Sidebar/Sidebar";
import styled from "styled-components";
import UsersService from "../services/users.service";
import {OverviewBanner} from "./components/OverviewBanner";
import {Paper} from "@mui/material";
import Footer from "./components/footer";
import LiveDateTime from "./components/LiveTimeDate";

const OverviewContainer = styled.div`

`;
const ContentContainer = styled(Paper)`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


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

export const Overview = () => {
    const currentUser = UsersService.getFullUser();
    const userFullName = currentUser.firstName + " " + currentUser.lastName;

    return (
        <OverviewContainer>
            <Sidebar/>
            <OverviewBanner/>
            <ContentContainer>
                <Greeting username={userFullName}/>
                <LiveDateTime/>
            </ContentContainer>
            <Footer/>
        </OverviewContainer>
    )
}
