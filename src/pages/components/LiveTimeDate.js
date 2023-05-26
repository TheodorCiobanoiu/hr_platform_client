import React, {useEffect, useState} from "react";
import styled from "styled-components";
import "@fontsource/varela-round"; // Import the font

const DateTimeContainer = styled.div`
  float: right;
`;

const DateText = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  font-family: 'Varela Round', sans-serif;
  color: #15171c;
  margin: 0;
`;

const TimeText = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Varela Round', sans-serif;
  color: #15171c;
  margin: 0;
`;

const LiveDateTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    function tick() {
        setDate(new Date());
    }

    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    const dateString = "It's " + date.toLocaleDateString(undefined, options);

    return (
        <DateTimeContainer>
            <DateText>{dateString}</DateText>
            <TimeText>{date.toLocaleTimeString()}</TimeText>
        </DateTimeContainer>
    );
};

export default LiveDateTime;
