import {Sidebar} from "./components/Sidebar/Sidebar";
import {Autocomplete, FormGroup} from "@mui/material";
import {ContentContainer, StyledButton, StyledDatePicker, StyledTextField} from "./components/StyledComponents";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {addDays, format} from "date-fns";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import UsersService from "../services/users.service";
import Typography from "@mui/material/Typography";
import RequestsService from "../services/requests.service";
import {useNavigate} from "react-router-dom";
import Footer from "./components/footer";


const autoCompleteOptions = [
    {label: "Select request type...", requestType: ""},
    {label: "Cerere Concediu Odihna", requestType: "CERERE_CONCEDIU_ODIHNA"},
    {label: "Cerere Concediu Neplatit", requestType: "CERERE_CONCEDIU_ODIHNA"},
];

export const CreateRequest = () => {

    const user = UsersService.getFullUser();
    const navigate = useNavigate();

    const [autocompleteValue, setAutocompleteValue] = React.useState(autoCompleteOptions[0]);
    const [startDateValue, setStartDateValue] = React.useState();
    const [endDateValue, setEndDateValue] = React.useState();
    const [checked, setChecked] = React.useState(false);
    const [error, setError] = React.useState(false);

    console.log(startDateValue ? format(startDateValue, "dd-MM-yyyy") : 'No date selected');

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    }

    const handleSubmit = () => {
        if (!startDateValue) {
            setError(true);
        }
        if (!checked && !endDateValue) {
            setError(true);
        } else {
            const request = {
                noOfDays: 0,
                userId: user.userID,
                documentType: autocompleteValue.requestType,
                details: {
                    startDate: format(startDateValue, "dd-MM-yyyy"),
                    endDate: format(endDateValue, "dd-MM-yyyy")
                }
            }
            console.log(request);
            RequestsService.createNewRequest(request, user).then(() => {
                navigate("/request/user/all", {replace: true});
            });
        }
    };

    return (
        <>
            <Sidebar/>
            <ContentContainer sx={{marginTop: '10vh'}} elevation={4}>
                <Grid container spacing={1} rowSpacing={6}>
                    <Grid item xs={4}/>
                    <Grid item xs={4}>
                        <Autocomplete
                            value={autocompleteValue}
                            onChange={(event, newValue) => {
                                if (newValue === null) setAutocompleteValue(autoCompleteOptions[0]);
                                else setAutocompleteValue(newValue);
                            }}
                            id="autocomplete-request-type"
                            options={autoCompleteOptions}
                            sx={{width: '100%'}}
                            renderInput={(params) => <StyledTextField {...params} label="Select Request Type..."/>}
                        />
                    </Grid>
                    <Grid item xs={2}/>
                    {autocompleteValue.requestType === "CERERE_CONCEDIU_ODIHNA" &&
                        (<>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={handleChecked}
                                                    sx={{'&.Mui-checked': {color: "#632ce4"}}}/>
                                            }
                                            label={'Concediu de o zi'}/>
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={4}/>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid item xs={4}/>
                                    <Grid item xs={2}>
                                        <StyledDatePicker
                                            label="Start date"
                                            value={startDateValue}
                                            format={"dd-MM-yyyy"}
                                            onChange={(newValue) => {
                                                setStartDateValue(newValue);
                                                setError(false);
                                            }}
                                            sx={{width: "100%"}}
                                        />
                                    </Grid>
                                    {!checked ?
                                        (<>
                                                <Grid item xs={2}>
                                                    <StyledDatePicker
                                                        label="End date"
                                                        value={endDateValue}
                                                        format={"dd-MM-yyyy"}
                                                        minDate={addDays(startDateValue, 1)}
                                                        maxDate={addDays(startDateValue, user.userDetailsDTO.noOfVacationDays + 1)}
                                                        onChange={(newValue) => {
                                                            setEndDateValue(newValue);
                                                            setError(false);
                                                        }}
                                                        sx={{width: "100%"}}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}/>
                                            </>
                                        ) : (<Grid item xs={6}/>)}
                                    <Grid item xs={4}/>
                                    <Grid item xs={4}>
                                        <StyledButton
                                            type="submit"
                                            variant="filledTonal"
                                            onClick={handleSubmit}
                                            sx={{width: "100%"}}
                                        >
                                            Generate PDF
                                        </StyledButton>
                                    </Grid>
                                    <Grid item xs={4}/>
                                    <Grid item xs={4}/>
                                    {error && (
                                        <Typography variant="body2" style={{color: "red", marginTop: "1em"}}>
                                            Please enter Start Date and End Date in order to generate PDF
                                        </Typography>
                                    )}
                                </LocalizationProvider>
                            </>
                        )}
                </Grid>
            </ContentContainer>
            <Footer/>
        </>
    )
};
