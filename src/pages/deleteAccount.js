import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import ParticlesBackground from "../components/ParticlesBackground";
import AdminService from "../services/admin.service";
//const settings = ["Profile", "Logout"];
//const today = Date.getFullYear() + "-" + Date.getMonth() + "-" + Date.getDate();
// const defaultValues = {
//   name: "",
//   date: "10/04/2022",
//   gender: "",
//   os: "",
//   favoriteNumber: 0,
// };

const DeleteAccount = () => {
  const [formValues, setFormValues] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  /*const handleSliderChange = (name) => (e, value) => {
          setFormValues({
              ...formValues,
              [name]: value,
          });
      };*/
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  const handleDelete = () => {
    console.log(formValues);
    let axiosResponse;
    AdminService.deleteUser(formValues)
      .then((response) => {
        axiosResponse = response.data;
        console.log(axiosResponse);
      })
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <br />
      {/*<ParticlesBackground />*/}
      <div>
        <Container
          maxWidth="sm"
          fixed
          sx={{
            width: "90%",
            color: "white",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            position: "relative",
            borderRadius: 10,
          }}
        >
          <Box sx={{ bgcolor: "#ffffff", borderRadius: 10 }}>
            <br />
            <form onSubmit={handleSubmit}>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Grid item>
                  <TextField
                    id="username"
                    name="username"
                    label="Username: "
                    type="text"
                    value={formValues.username}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <br />
                {/*<Grid item>*/}
                {/*  <TextField*/}
                {/*      id="password"*/}
                {/*      label="UNIQUE ADMIN PASSWORD: "*/}
                {/*      name="password"*/}
                {/*      type="password"*/}
                {/*      value={formValues.username}*/}
                {/*      onChange={handleInputChange}*/}
                {/*      required*/}
                {/*  />*/}
                {/*</Grid>*/}
                <br />

                <Button
                  style={{
                    borderRadius: 35,
                    padding: "18px 36px",
                    fontSize: "18px",
                    color: "black",
                    borderWidth: 4,
                  }}
                  variant="outlined"
                  sx={{ backgroundColor: "white", height: 40 }}
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
              <br />
            </form>
          </Box>
        </Container>{" "}
      </div>
      <br />
      <div>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            style={{
              borderRadius: 35,
              padding: "18px 36px",
              fontSize: "18px",
              color: "black",
              borderWidth: 4,
            }}
            variant="outlined"
            sx={{ backgroundColor: "white", height: 40 }}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </Box>
      </div>
      <Box sx={{ mt: 44.1, mb: 0 }}>
        <Footer />
      </Box>
    </div>
  );
};
export default DeleteAccount;
