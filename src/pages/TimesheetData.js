import {Sidebar} from "./components/Sidebar/Sidebar";
import * as StyledComponents from "./components/StyledComponents";
import {ContentContainer, StyledButton, StyledCard} from "./components/StyledComponents";
import Typography from "@mui/material/Typography";
import React from "react";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import TimesheetService from "../services/timesheet.service";
import {format} from "date-fns";
import Stack from "@mui/material/Stack";
import Footer from "./components/footer";
import {Modal} from "@mui/material";
import {ModalTimesheet} from "./components/ModalTimesheet";
import UsersService from "../services/users.service";

export const TimesheetData = () => {

    const [clickedTimesheet, setClickedTimesheet] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [timesheets, setTimesheets] = React.useState([]);
    const [clickedUser, setClickedUser] = React.useState(null);
    const [monthlyData, setMonthlyData] = React.useState({});


    React.useEffect(() => {
        getData();
    }, []);

    React.useEffect(() => {
        const fetchUser = async () => {
            const user = await UsersService.getGivenUserById(clickedTimesheet.user.userID);
            setClickedUser(user);
        };
        fetchUser();
    }, [clickedTimesheet]);

    const getData = async () => {
        await TimesheetService.getAllTimesheets().then((response) => {
            const data = response.data;
            setTimesheets(data);
        });
        const date = new Date();
        const getMonthlyData = await TimesheetService.getDataForGivenMonth(date.getMonth());
        setMonthlyData(getMonthlyData);
        console.log(getMonthlyData);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90, hide: true},
        {
            field: 'month', headerName: 'Month', flex: 1, width: 100, valueGetter: (params) => {
                return format(new Date(2000, params.row.month, 1), 'MMMM');
            }
        },
        {
            field: 'fullName', headerName: 'Employee Name', flex: 1, valueGetter: (params) => {
                return (params.row.user.firstName + " " + params.row.user.lastName);
            }
        },
        {
            field: "action",
            headerName: "",
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    setClickedTimesheet(timesheets.find(element => element.id === thisRow.id));
                    setOpenModal(true);
                };

                return <StyledButton onClick={onClick} sx={{width: '90%', height: '90%'}}>Open</StyledButton>;
            }
        },
    ];

    return (
        <>
            <Sidebar/>
            <ContentContainer>
                <Stack justifyContent="center" alignItems="center" width="100%" spacing={2}>
                    <StyledCard sx={{width: "100%", maxWidth: 1000}}>
                        <Stack justifyContent="center" width="100%" spacing={2}>
                            <Typography variant="body1" style={{
                                marginTop: "1em",
                                fontSize: "1em",
                                fontFamily: "Varela Round",
                                fontWeight: "bold",
                                color: "#15171c"
                            }}
                            >
                                Number of filled timesheets for the current month: {monthlyData.noOfFilledTimesheets}
                            </Typography>
                            <Typography variant="body1" style={{
                                marginTop: "1em",
                                fontSize: "1em",
                                fontFamily: "Varela Round",
                                fontWeight: "bold",
                                color: "#15171c"
                            }}
                            >
                                Number of holidays for the current month: {monthlyData.noOfHolidays} days
                            </Typography>
                            <Typography variant="body1" style={{
                                marginTop: "1em",
                                fontSize: "1em",
                                fontFamily: "Varela Round",
                                fontWeight: "bold",
                                color: "#15171c"
                            }}
                            >
                                Number of vacation days for the current month: {monthlyData.noOfVacationDays} days
                            </Typography>
                        </Stack>
                    </StyledCard>
                    <div style={{height: '71vh', width: '100%', maxWidth: 1000}}>
                        <DataGrid
                            columns={columns}
                            rows={timesheets}
                            pageSize={8}
                            getRowId={(row) => row.id}
                            rowsPerPageOptions={[5]}
                            initialState={{
                                sorting: {sortModel: [{field: "month", sort: "asc"}]}
                            }}
                        />
                    </div>
                </Stack>
                <Modal open={openModal} onClose={handleCloseModal} style={StyledComponents.modalStyles}>
                    <ContentContainer sx={{marginTop: '10vh', alignItems: 'start', width: "90%"}}>
                        {clickedUser && <ModalTimesheet timesheet={clickedTimesheet} user={clickedUser}/>}
                    </ContentContainer>
                </Modal>
            </ContentContainer>
            <Footer/>
        </>
    )
}
