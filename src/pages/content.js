import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Footer from "./footer";
import Header from "./header";
import ParticlesBackground from "../components/ParticlesBackground";
import AuthService from "../services/auth.service";
const user = AuthService.getCurrentUser();
const role =user.roles[0];
const Content = () => {
  return (
    <div>
      <Header />
      <br />
      <ParticlesBackground />
      <div>
        <Box sx={{ width: "30%", margin: "auto", color: "#b34454" }}>
          <Stack spacing={4} sx={{ mt: 4 }}>
            <Button
              style={{
                borderRadius: 35,
                padding: "18px 36px",
                fontSize: "18px",
                color: "black",
                borderWidth: 4,
              }}
              variant="outlined"
              sx={{backgroundColor: 'white' }}
              href="/completeRecommendation"
            >
              Add recommendation
            </Button>
            <Button
              style={{
                weight: 200,
                borderRadius: 35,
                padding: "18px 32px",
                fontSize: "18px",
                color: "black",
                borderWidth: 4,
              }}
              variant="outlined"
              sx={{backgroundColor: 'white' }}
              href="/yourRecommendation"
            >
              See your recommendations
            </Button>
            {(role === "ROLE_HR" || role === "ROLE_ADMIN") && (
              <Button
                style={{
                  borderRadius: 35,
                  padding: "18px 36px",
                  fontSize: "18px",
                  color: "black",
                  borderWidth: 4,
                }}
                variant="outlined"
                sx={{backgroundColor: 'white' }}
                href="/viewRecommendations"
              >
                See all recommendations
              </Button>
            )}
            {role === "ROLE_ADMIN" && (
              <Button
                style={{
                  borderRadius: 35,
                  padding: "18px 36px",
                  fontSize: "18px",
                  color: "black",
                  borderWidth: 4,
                }}
                variant="outlined"
                sx={{backgroundColor: 'white' }}
                href="/admin"
              >
                Admin control
              </Button>
            )}
          </Stack>
        </Box>
      </div>
      <Box sx={{ mt: 21, mb: 0}}>
        <Footer />
      </Box>
    </div>
  );
};
export default Content;
