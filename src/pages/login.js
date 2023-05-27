import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {Paper} from "@mui/material";
import {styled} from "@mui/system";

const GradientBorderPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(10),
    background: "white",
    border: 0,
    borderRadius: "20px",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    boxDecorationBreak: "clone",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    marginTop: "15vh",
}));

const StyledTextField = styled(TextField)({
    '& label': {
        color: '#632ce4',
    },
    '& label.Mui-focused': {
        color: '#15171c',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#15171c',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#632ce4',
        },
    },
});

const StyledButton = styled(Button)({
    borderColor: '#15171c',
    borderRadius: 10,
    padding: "18px 36px",
    fontSize: "18px",
    color: "#632ce4",
    position: "relative",
    borderWidth: 2,
    '&:hover': {
        borderColor: '#632ce4',
        borderWidth: 2,
        color: '#15171c',
    }
});

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("");
        setUsernameError(false);
        setPasswordError(false);
        setLoginError(false);

        AuthService.login(username, password).then(
            () => {
                navigate("/overview");
                window.location.reload();
            },
            () => {
                setMessage("Incorrect username or password");
                setUsernameError(true);
                setPasswordError(true);
                setLoginError(true);
            }
        );
    };

    const resetLoginError = () => {
        if (loginError) {
            setLoginError(false);
            setUsernameError(false);
            setPasswordError(false);
        }
    }

    React.useEffect(() => {
        AuthService.logout();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <GradientBorderPaper elevation={3}>
                <Avatar sx={{m: 1, bgcolor: "#632ce4"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{mt: 1}}
                >
                    <StyledTextField
                        margin="normalc"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        color={''}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            resetLoginError();
                        }}
                        error={usernameError}
                    />
                    <StyledTextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            resetLoginError();
                        }}
                        error={passwordError}
                    />
                    <br/>
                    <br/>
                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </StyledButton>
                    {loginError && (
                        <Typography variant="body2" style={{color: "red", marginTop: "1em"}}>
                            {message}
                        </Typography>
                    )}
                    <br/>
                    <br/>
                </Box>
            </GradientBorderPaper>
        </div>
    );
};

export default Login;