import Box from "@mui/material/Box";
import {Alert, Step, StepLabel, Stepper} from "@mui/material";
import React from "react";
import {StyledButton, StyledConnector, StyledStepIcon, StyledTextField} from "./StyledComponents";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {CardCerereCO} from "./ModalRequest/CardCerereCO";
import {CardEmployeeDetails} from "./ModalRequest/CardEmployeeDetails";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import FilesService from "../../services/files.service";
import RequestsService from "../../services/requests.service";
import AuthService from "../../services/auth.service";

const steps = [
    'Not Reviewed',
    'Reviewed',
    'In progress',
    'Accepted',
    'Rejected'
];


const setStatusToRequest = (currentStatus) => {
    switch (currentStatus) {
        case 'Not Reviewed':
            return 'Not_Reviewed';
        case 'Reviewed':
            return 'Reviewed';
        case 'In progress':
            return 'In_Progress';
        case 'Accepted':
            return 'Accepted';
        case 'Rejected':
            return 'Rejected';
        default:
            return "Not_Reviewed";
    }
}

export const ModalRequest = (prop) => {

    const [fileSelected, setFileSelected] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    const request = prop.request;
    const pathName = window.location.pathname;
    const user = AuthService.getCurrentUser();

    const getActiveStep = () => {
        switch (request.status) {
            case "Not_Reviewed":
                return 0;
            case "Reviewed":
                return 1;
            case "In_Progress":
                return 2;
            case "Accepted":
                return 3;
            case "Rejected":
                return 4;
        }
    };

    const getCardType = () => {
        switch (request.requestType) {
            case "CERERE_CONCEDIU_ODIHNA":
                return (<CardCerereCO clickedRequest={request}/>);
            case "CERERE_CONCEDIU_NEPLATIT":
                return (<Card/>);
            default:
                return (<></>);
        }
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileSelected(true);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleDownload = async () => {
        FilesService.downloadFile(request.fileId).then((response) => {
            console.log(response.data);
            window.open(URL.createObjectURL(response.data));
        });
    }

    const handleSubmit = async () => {
        if (selectedFile !== null) {
            const formData = new FormData();
            formData.append("file", selectedFile, selectedFile.name);
            await FilesService.uploadFile(formData).then((response) => {
                request.fileId = response.data.fileId;
            });
        }
        request.status = setStatusToRequest(status);
        if (user.roles[0] === 'ROLE_HR') {
            request.signed = true;
        }
        await RequestsService.saveRequest(request);
        prop.handleCloseModal();
    }

    return (
        <Box sx={{width: "100%"}}>
            <Stepper alternativeLabel activeStep={getActiveStep()} connector={<StyledConnector/>}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={StyledStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h4" style={{
                        marginTop: "1em",
                        fontSize: "2em",
                        fontWeight: "bold",
                        fontFamily: "Varela Round",
                        color: "#15171c"
                    }}
                    >
                        Employee data
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" style={{
                        marginTop: "1em",
                        fontSize: "2em",
                        fontWeight: "bold",
                        fontFamily: "Varela Round",
                        color: "#15171c"
                    }}
                    >
                        Request info
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <CardEmployeeDetails clickedRequest={request}/>
                </Grid>
                <Grid item xs={6}>
                    {getCardType()}
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                    {(request.fileId === null ||
                        ((user.roles[0] === 'ROLE_HR' || user.roles[0] === 'ROLE_ADMIN')
                            && pathName === "/request/all")) && (
                        <StyledButton component="label">
                            Upload Signed Request
                            <input
                                hidden
                                accept=".pdf"
                                type="file"
                                onChange={onFileChange}
                            />
                        </StyledButton>
                    )}
                    {(request.fileId !== null) && (
                        <StyledButton onClick={handleDownload}>
                            Download Request
                        </StyledButton>
                    )}
                </Grid>
                {fileSelected &&
                    <Grid item xs={12} container justifyContent="center">
                        <Alert severity="success">
                            The file {selectedFile.name} has been selected and will be uploaded on submit
                        </Alert>
                    </Grid>}
                <Grid item xs={12} container justifyContent="center">
                    {((pathName === '/request/all') && (user.roles[0] === 'ROLE_HR' || user.roles[0] === 'ROLE_ADMIN')) &&
                        <StyledTextField
                            select
                            label="Change status"
                            sx={{width: "20%"}}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="Reviewed">
                                Reviewed
                            </MenuItem>

                            <MenuItem value="In progress">
                                In progress
                            </MenuItem>

                            <MenuItem value="Accepted">
                                Accepted
                            </MenuItem>

                            <MenuItem value="Rejected">
                                Rejected
                            </MenuItem>
                        </StyledTextField>}
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                    <StyledButton onClick={handleSubmit}>
                        Submit Changes
                    </StyledButton>
                </Grid>

            </Grid>


        </Box>
    )
}
