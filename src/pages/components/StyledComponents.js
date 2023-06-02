import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers";
import {Paper} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";


export const ContentContainer = styled(Paper)`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledTextField = styled(TextField)({
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

export const StyledDatePicker = styled(DatePicker)({
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


export const StyledButton = styled(Button)({
    borderColor: '#15171c',
    borderRadius: 10,
    padding: "18px 36px",
    fontSize: "18px",
    color: "#15171c",
    position: "relative",
    borderWidth: 2,
    backgroundColor: "rgba(99,44,228,0.4)",
    '&:hover': {
        backgroundColor: "rgba(99,44,228,0.7)",
        borderColor: '#632ce4',
        borderWidth: 2,
        color: '#15171c',
    }
});
