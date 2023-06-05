import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers";
import {Paper, StepConnector, stepConnectorClasses} from "@mui/material";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";
import {Check} from "@mui/icons-material";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";


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

export const StyledCard = styled(Card)({
    backgroundColor: "rgba(99,44,228,0.4)",
    color: '#15171c',
    padding: "1em"
});


export const StyledConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#632ce4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#632ce4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#e1e9fc',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

export function StyledStepIcon(props) {
    const {active, completed, className} = props;

    return (
        <StyledStepIconRoot ownerState={{active}} className={className}>
            {completed ? (
                <Check className="StyledStepIcon-completedIcon"/>
            ) : (
                <div className="StyledStepIcon-circle"/>
            )}
        </StyledStepIconRoot>
    );
}

StyledStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const StyledStepIconRoot = styled('div')(({theme, ownerState}) => ({
    color: '#e1e9fc',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#632ce4',
    }),
    '& .StyledStepIcon-completedIcon': {
        color: '#632ce4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .StyledStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));
