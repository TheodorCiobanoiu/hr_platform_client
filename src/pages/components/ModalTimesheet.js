import Box from "@mui/material/Box";
import React, {useState} from "react";
import {StyledCalendar, StyledCard} from "./StyledComponents";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {format} from "date-fns";
import AdminService from "../../services/admin.service";
import VacationsService from "../../services/vacations.service";


export const ModalTimesheet = (prop) => {

    const [selectedDates, setSelectedDates] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [vacationDays, setVacationDays] = useState([]);

    const timesheet = prop.timesheet;
    console.log("timesheet");
    console.log(timesheet);
    const user = prop.user;

    React.useEffect(() => {
        const fnsDates = [];
        timesheet.workDates.forEach((date) => {
            const fnsDate = new Date(date);
            fnsDate.setHours(12, 0, 0, 0); // This sets the time to 12:00 PM
            fnsDates.push(fnsDate);
        })
        setSelectedDates(fnsDates);
        fetchData();
    }, []);

    const fetchData = async () => {
        const getHolidays = await AdminService.getAllHolidays();
        setHolidays(getHolidays);
        const getVacationDays = await VacationsService.getAllVacationsForUser(user.userID);
        setVacationDays(getVacationDays);
    }

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

    const tileDisabled = ({date, view}) =>
        view === 'month' && (date.getMonth() !== timesheet.month || isWeekend(date) || isHoliday(date) || isVacationDay(date));

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

    const formatShortWeekday = (locale, date) => {
        const localeDate = new Date(date);
        localeDate.toLocaleString(locale);
        const shortWeekday = localeDate.toLocaleString(locale, {weekday: 'short'});
        return shortWeekday.charAt(0).toUpperCase() + shortWeekday.slice(1);
    }

    return (
        <Box sx={{width: "100%"}}>
            <Stack justifyContent="center" alignItems="center" width="100%" spacing={2}>
                <Typography variant="h4" style={{
                    marginTop: "1em",
                    fontSize: "2em",
                    fontWeight: "bold",
                    fontFamily: "Varela Round",
                    color: "#15171c"
                }}
                >
                    Timesheet completed by {user.firstName} {user.lastName} for the
                    month {format(new Date(2000, timesheet.month, 1), 'MMMM')}
                </Typography>
                <StyledCard sx={{width: "100%", maxWidth: 1000}}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{
                                    marginTop: "1em",
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    fontWeight: "bold",
                                    color: "#15171c"
                                }}
                                >
                                    Name:
                                </Typography>
                                <Typography variant="body1" style={{
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    color: "#15171c"
                                }}
                                >
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{
                                    marginTop: "1em",
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    fontWeight: "bold",
                                    color: "#15171c"
                                }}
                                >
                                    Email:
                                </Typography>
                                <Typography variant="body1" style={{
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    color: "#15171c"
                                }}
                                >
                                    {user.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{
                                    marginTop: "1em",
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    fontWeight: "bold",
                                    color: "#15171c"
                                }}
                                >
                                    Phone:
                                </Typography>
                                <Typography variant="body1" style={{
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    color: "#15171c"
                                }}
                                >
                                    {user.phone}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{
                                    marginTop: "1em",
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    fontWeight: "bold",
                                    color: "#15171c"
                                }}
                                >
                                    Job Title:
                                </Typography>
                                <Typography variant="body1" style={{
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    color: "#15171c"
                                }}
                                >
                                    {user.userDetailsDTO.jobTitle}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" style={{
                                    marginTop: "1em",
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    fontWeight: "bold",
                                    color: "#15171c"
                                }}
                                >
                                    Department:
                                </Typography>
                                <Typography variant="body1" style={{
                                    fontSize: "1em",
                                    fontFamily: "Varela Round",
                                    color: "#15171c"
                                }}
                                >
                                    {user.userDetailsDTO.department}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </StyledCard>
                <StyledCalendar
                    key={timesheet.month}
                    value={new Date(2023, timesheet.month, 1)}
                    tileDisabled={tileDisabled}
                    formatShortWeekday={formatShortWeekday}
                    tileClassName={tileClassName}
                />
            </Stack>
        </Box>
    )
}
