import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Footer from "./components/footer";
import axios from "axios";
import authHeader from "../services/auth-header";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import RecommendationService from "../services/recommendation.service";
import MailService from "../services/mail.service";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ContentContainer, StyledButton, StyledTextField} from "./components/StyledComponents";
import Stack from "@mui/material/Stack";
import {Alert, Paper} from "@mui/material";


const user = AuthService.getCurrentUser();

const MAIL_RECEIVER = "cvtemplateapp@gmail.com";
const MAIL_SUBJECT = "A new recommendation has been submitted";
const MAIL_TEXT = "There is a new recommendation submitted by " + user.username + ". Go check it out!";

function AddRecommendation() {

    const [questions, setQuestions] = useState(null);
    const [fileSelected, setFileSelected] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [value, setValue] = React.useState();
    const navigate = useNavigate();


    const fetchData = () => {
        return axios
            .get("http://localhost:8082/api/question/all", {headers: authHeader()})
            .then((response) => setQuestions(response.data));
    };
    useEffect(() => {
        fetchData();
    }, []);

    const validationSchema = Yup.object().shape({
        candidateFirstName: Yup.string().required("This field is required"),
        candidateLastName: Yup.string().required("This field is required"),
        candidateEmail: Yup.string().email("Invalid email format").required("Email is required"),
        candidatePhoneNumber: Yup.string().min(10, 'Phone number too short').max(10, 'Phone number too long').required("Invalid phone format")
    });

    const handleSubmit = async (values) => {
        const allAnswers = [];
        questions.forEach((question) => {
            console.log(question);
            const answer = {
                question: {},
                answerBody: ""
            }
            if (question.type === "Multiple_Choice") {
                const allTheAnswers = values[question.id];
                let finalAnswer;
                //allTheAnswers.forEach(answer =>{finalAnswer += ", " + answer});
                finalAnswer = allTheAnswers[0];
                for (let i = 1; i < allTheAnswers.length; i++) {
                    finalAnswer += ", " + allTheAnswers[i];
                }
                answer.answerBody = finalAnswer;
                answer.question = question;
                allAnswers.push(answer);
                console.log("Final answer: " + finalAnswer);
            } else {
                answer.answerBody = values[question.id];
                answer.question = question;
                allAnswers.push(answer);
            }
        });
        console.log("GIVEN ANSWERS");
        console.log(allAnswers);

        const formData = new FormData();
        await formData.append("file", selectedFile, selectedFile.name);
        console.log(selectedFile);
        const user = JSON.parse(localStorage.getItem("user"));
        let recommendationFileId = 0;
        axios.post("http://localhost:8082/file/uploadFile", formData, {
            headers: {
                Authorization: "Bearer " + user.token,
                "Content-Type": "multipart/form-data",
            },
        }).then(async (response) => {

            console.log("AXIOS FILE RESPONSE");
            console.log(response.data);
            recommendationFileId = response.data.fileId;
            console.log(recommendationFileId);
            const formVal = {
                userId: user.id,
                candidateFirstName: values.candidateFirstName,
                candidateLastName: values.candidateLastName,
                candidateEmail: values.candidateEmail,
                candidatePhoneNumber: values.candidatePhoneNumber,
                progressStatus: "Not_Reviewed",
                department: values.department,
                jobType: values.jobType,
                cvFileId: recommendationFileId,
                answers: allAnswers,
            }

            console.log("FINAL FORM VALUES ");


            await RecommendationService.addRecommendation(formVal).then((response) => {
                console.log(response);
            });
            MailService.sendMail(MAIL_RECEIVER, MAIL_SUBJECT, MAIL_TEXT);
            navigate("/overview");
        });
    };


    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileSelected(true);
    };

    const onSubmitForm = () => {
    };

    return (
        <div>
            <Sidebar/>
            <ContentContainer sx={{width: '80%', maxWidth: '1000'}}>
                <Box sx={{bgcolor: "#ffffff", borderRadius: 10}}>
                    <Formik initialValues={{}} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {(props) => (
                            <Form noValidate onSubmit={props.handleSubmit} className="form">
                                <Stack justifyContent="center" alignItems="center" width="100%" spacing={5}>
                                    <Typography variant="h4" style={{
                                        marginTop: "1em",
                                        fontFamily: "Varela Round",
                                        fontWeight: "bold",
                                        color: "#15171c"
                                    }}
                                    >
                                        Please fill this recommendation form with the candidate info:
                                    </Typography>
                                    <Field
                                        as={StyledTextField}
                                        required
                                        label="First Name"
                                        id="outlined-required"
                                        name="candidateFirstName"
                                        type="text"
                                        error={Boolean(props.touched.candidateFirstName && props.errors.candidateFirstName)}
                                        helperText={props.touched.candidateFirstName && props.errors.candidateFirstName}
                                        value={props.values.candidateFirstName}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                    />

                                    <Field
                                        as={StyledTextField}
                                        required
                                        label="Last Name"
                                        id="name-input-last"
                                        name="candidateLastName"
                                        type="text"
                                        error={Boolean(props.touched.candidateLastName && props.errors.candidateLastName)}
                                        helperText={props.touched.candidateLastName && props.errors.candidateLastName}
                                        value={props.values.candidateLastName}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                    />

                                    <Field
                                        as={StyledTextField}
                                        required
                                        label="Email"
                                        id="email-input"
                                        name="candidateEmail"
                                        type="text"
                                        error={Boolean(props.touched.candidateEmail && props.errors.candidateEmail)}
                                        helperText={props.touched.candidateEmail && props.errors.candidateEmail}
                                        value={props.values.candidateEmail}
                                        onBlur={props.handleBlur}
                                        onChange={props.handleChange}
                                    />

                                    <Field
                                        as={StyledTextField}
                                        required
                                        label="Phone Number"
                                        id="phone-input"
                                        name="candidatePhoneNumber"
                                        type="text"
                                        error={Boolean(props.touched.candidatePhoneNumber && props.errors.candidatePhoneNumber)}
                                        value={props.values.candidatePhoneNumber}
                                        onChange={props.handleChange}
                                    />
                                    <StyledTextField
                                        id="department"
                                        required
                                        label="Department: "
                                        name="department"
                                        type="department"
                                        onChange={props.handleChange}
                                        value={props.values.department}
                                        sx={{width: 225}}
                                        select
                                    >
                                        <MenuItem value="HR"> HR </MenuItem>
                                        <MenuItem value="CAD"> CAD </MenuItem>
                                        <MenuItem value="Design"> Design </MenuItem>
                                        <MenuItem value="Testing"> Testing </MenuItem>
                                        <MenuItem value="Technology"> Technology </MenuItem>
                                        <MenuItem value="Marketing"> Marketing </MenuItem>
                                    </StyledTextField>

                                    <StyledTextField
                                        id="jobTitle"
                                        required
                                        label="Job title: "
                                        name="jobType"
                                        type="jobType"
                                        onChange={props.handleChange}
                                        value={props.values.jobType}
                                        sx={{width: 225}}
                                        select
                                    >
                                        <MenuItem value={"HR"}> Human Resources </MenuItem>
                                        <MenuItem value={"JUNIOR_ENGINEER"}> Junior Engineer </MenuItem>
                                        <MenuItem value={"SENIOR_ENGINEER"}> Senior Engineer </MenuItem>
                                        <MenuItem value={"QUALITY_ASSURANCE"}> Quality Assurance </MenuItem>
                                    </StyledTextField>

                                    <Typography variant="h4" style={{
                                        marginTop: "1em",
                                        fontFamily: "Varela Round",
                                        fontWeight: "bold",
                                        color: "#15171c"
                                    }}
                                    >
                                        Please answer the following questions about the candidate:
                                    </Typography>

                                    {questions &&
                                        questions.length &&
                                        questions.map((question, key) => (
                                            <Paper elevation={3} sx={{width: '75%', padding: '2%'}}>
                                                <Stack justifyContent="center" alignItems="center" width="100%"
                                                       spacing={2}>
                                                    <Typography variant="h5" style={{
                                                        marginTop: "1em",
                                                        fontFamily: "Varela Round",
                                                        color: "#15171c"
                                                    }}
                                                    >
                                                        {question.questionBody}
                                                    </Typography>
                                                    {question.type === "Free_Text" && (
                                                        <StyledTextField
                                                            label="Write your answer here"
                                                            multiline
                                                            fullWidth={true}
                                                            value={value}
                                                            name={question.id}
                                                            onChange={props.handleChange}
                                                        />
                                                    )}
                                                    {question.type === "Single_Choice" && (
                                                        <StyledTextField
                                                            id="filled-select-answer"
                                                            select
                                                            label="Select"
                                                            onChange={props.handleChange}
                                                            variant="outlined"
                                                            fullWidth={true}
                                                            name={question.id}
                                                        >
                                                            {question.possibleAnswer1 && (
                                                                <MenuItem
                                                                    value={question.possibleAnswer1}>
                                                                    {question.possibleAnswer1}
                                                                </MenuItem>
                                                            )}
                                                            {question.possibleAnswer2 && (
                                                                <MenuItem
                                                                    value={question.possibleAnswer2}>
                                                                    {question.possibleAnswer2}
                                                                </MenuItem>
                                                            )}
                                                            {question.possibleAnswer3 && (
                                                                <MenuItem
                                                                    value={question.possibleAnswer3}>
                                                                    {question.possibleAnswer3}
                                                                </MenuItem>
                                                            )}
                                                            {question.possibleAnswer4 && (
                                                                <MenuItem
                                                                    value={question.possibleAnswer4}>
                                                                    {question.possibleAnswer4}
                                                                </MenuItem>
                                                            )}
                                                        </StyledTextField>
                                                    )}
                                                    {question.type === "Multiple_Choice" && (
                                                        <Box onChange={props.handleChange}>
                                                            <FormControlLabel
                                                                label={question.possibleAnswer1}
                                                                control={
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: '#632ce4',
                                                                            '&.Mui-checked': {
                                                                                color: '#632ce4',
                                                                            },
                                                                        }}
                                                                        checked={value}
                                                                        onChange={props.handleChange}
                                                                        name={question.id}
                                                                        inputProps={{
                                                                            possibleAnswer1:
                                                                            question.possibleAnswer1,
                                                                        }}
                                                                        value={question.possibleAnswer1}
                                                                    />
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                label={question.possibleAnswer2}
                                                                control={
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: '#632ce4',
                                                                            '&.Mui-checked': {
                                                                                color: '#632ce4',
                                                                            },
                                                                        }}
                                                                        checked={value}
                                                                        name={question.id}
                                                                        onChange={props.handleChange}
                                                                        inputProps={{
                                                                            possibleAnswer2:
                                                                            question.possibleAnswer2,
                                                                        }}
                                                                        value={question.possibleAnswer2}
                                                                    />
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                label={question.possibleAnswer3}
                                                                control={
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: '#632ce4',
                                                                            '&.Mui-checked': {
                                                                                color: '#632ce4',
                                                                            },
                                                                        }}
                                                                        checked={value}
                                                                        name={question.id}
                                                                        onChange={props.handleChange}
                                                                        inputProps={{
                                                                            possibleAnswer3:
                                                                            question.possibleAnswer1,
                                                                        }}
                                                                        value={question.possibleAnswer1}
                                                                    />
                                                                }
                                                            />
                                                            <FormControlLabel
                                                                label={question.possibleAnswer4}
                                                                control={
                                                                    <Checkbox
                                                                        sx={{
                                                                            color: '#632ce4',
                                                                            '&.Mui-checked': {
                                                                                color: '#632ce4',
                                                                            },
                                                                        }}
                                                                        checked={value}
                                                                        name={question.id}
                                                                        onChange={props.handleChange}
                                                                        inputProps={{
                                                                            possibleAnswer4:
                                                                            question.possibleAnswer4,
                                                                        }}
                                                                        value={question.possibleAnswer4}
                                                                    />
                                                                }
                                                            />
                                                        </Box>
                                                    )}</Stack>

                                            </Paper>

                                        ))}

                                    <StyledButton component="label">
                                        Upload CV for candidate
                                        <input
                                            hidden
                                            accept=".pdf"
                                            multiple
                                            type="file"
                                            onChange={onFileChange}
                                        />
                                    </StyledButton>
                                    {fileSelected &&
                                        <Alert severity="success">
                                            The file {selectedFile.name} has been selected and will be uploaded on
                                            submit
                                        </Alert>
                                    }
                                    <StyledButton type='submit' onClick={onSubmitForm}>
                                        Submit
                                    </StyledButton>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </ContentContainer>
            <Footer/>
        </div>
    );
}

export default AddRecommendation;
