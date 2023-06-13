import React, {useState} from 'react';
import {Sidebar} from './components/Sidebar/Sidebar';
import {ContentContainer, StyledButton, StyledCalendar, StyledTextField} from './components/StyledComponents';
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Footer from "./components/footer";
import UsersService from "../services/users.service";
import TimesheetService from "../services/timesheet.service";
import {Alert} from "@mui/material";
import AdminService from "../services/admin.service";
import VacationsService from "../services/vacations.service";


export const Timesheet = () => {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState(currentMonth);
    const [selectedDates, setSelectedDates] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [holidays, setHolidays] = useState([]);
    const [vacationDays, setVacationDays] = useState([]);
    const user = UsersService.getFullUser();

    React.useEffect(() => {
        fetchData();
    }, [month]);

    const fetchData = async () => {
        await TimesheetService.getUserTimesheetByMonth(month, user.userID).then((response) => {
            console.log(response);
            const dates = response.data.workDates;
            const fnsDates = [];
            dates.forEach((date) => {
                const fnsDate = new Date(date);
                fnsDate.setHours(12, 0, 0, 0); // This sets the time to 12:00 PM
                fnsDates.push(fnsDate);
            });
            setSelectedDates(fnsDates);
        });

        const getHolidays = await AdminService.getAllHolidays();
        setHolidays(getHolidays);
        const getVacationDays = await VacationsService.getAllVacationsForUser(user.userID);
        setVacationDays(getVacationDays);
    };

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const isHoliday = (date) => {
        return holidays.some((holiday) => isSameDay(holiday, date));
    };

    const isVacationDay = (date) => {
        return vacationDays.some((vacationDay) => isSameDay(vacationDay, date));
    };


    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    const formatShortWeekday = (locale, date) => {
        const localeDate = new Date(date);
        localeDate.toLocaleString(locale);
        const shortWeekday = localeDate.toLocaleString(locale, {weekday: 'short'});
        return shortWeekday.charAt(0).toUpperCase() + shortWeekday.slice(1);
    }

    const onChange = (date) => {
        if (!isWeekend(date)) {
            date.setHours(12, 0, 0, 0);  // This sets the time to 12:00 PM
            const index = selectedDates.findIndex((d) => isSameDay(d, date));
            if (index > -1) {
                setSelectedDates(selectedDates.filter((_, i) => i !== index));
            } else {
                setSelectedDates([...selectedDates, date]);
            }
        }
    };

    const tileDisabled = ({date, view}) =>
        view === 'month' && (date.getMonth() !== month || isWeekend(date) || isHoliday(date) || isVacationDay(date));

    const tileClassName = ({date, view}) => {
        if (view === 'month' && isHoliday(date)) {
            return 'holiday';
        } else if (view === 'month' && isVacationDay(date)) {
            return 'vacation';  // This assumes that you have a 'vacation' class defined in your CSS
        } else if (view === 'month' && isWeekend(date)) {
            return 'weekend';
        } else if (view === 'month' && selectedDates.some((d) => isSameDay(d, date))) {
            return 'highlight';
        }
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
        setSelectedDates([]);
    };

    const handleOnSubmit = () => {
        console.log(selectedDates);
        const timesheet = {
            month: month,
            userID: user.userID,
            workDates: selectedDates
        }
        TimesheetService.createNewTimesheet(timesheet).then((response) => {
            setSubmitted(true);
        });
    }

    return (
        <>
            <Sidebar/>
            <ContentContainer>
                <Grid container spacing={4}>
                    <Grid item xs={12} container justifyContent="center">
                        <StyledTextField select label="Select the month" sx={{width: "20%"}}
                                         onChange={handleMonthChange}>
                            <MenuItem
                                value={currentMonth}>{new Date(2023, currentMonth).toLocaleString('default', {month: 'long'})}</MenuItem>
                            <MenuItem
                                value={currentMonth - 1}>{new Date(2023, currentMonth - 1).toLocaleString('default', {month: 'long'})}</MenuItem>
                        </StyledTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{
                            marginTop: "1em",
                            fontWeight: "bold",
                            fontFamily: "Varela Round",
                            color: "#15171c"
                        }}
                        >
                            Please select all the dates in which you worked this month:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                        <StyledCalendar
                            key={month}
                            onChange={onChange}
                            value={new Date(2023, month, 1)}
                            tileDisabled={tileDisabled}
                            formatShortWeekday={formatShortWeekday}
                            tileClassName={tileClassName}
                        />
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                        <StyledButton onClick={handleOnSubmit}>Submit timesheet</StyledButton>
                    </Grid>
                    {submitted &&
                        <Grid item xs={12} container justifyContent="center">
                            <Alert severity="success">
                                Your timesheet has been submited succesfully
                            </Alert>
                        </Grid>}
                </Grid>
            </ContentContainer>
            <Footer/>
        </>
    );
};
