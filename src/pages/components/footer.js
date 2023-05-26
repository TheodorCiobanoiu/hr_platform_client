import * as React from "react";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <Typography
        variant="body2"
        color="black"
        align="center"
        position="absolute"
        bottom='0'
        width="100%"
        bgcolor="white"
        {...props}
    >
      {"Copyright © "}
      HR Platform &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer>
      <Copyright />
    </footer>
  );
}
