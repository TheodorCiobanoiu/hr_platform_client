import {Sidebar} from "./components/Sidebar/Sidebar";
import {ContentContainer, StyledButton} from "./components/StyledComponents";
import RequestsService from "../services/requests.service";
import UsersService from "../services/users.service";
import * as React from "react";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import {Modal} from "@mui/material";
import {ModalRequest} from "./components/ModalRequest";
import Footer from "./components/footer";

const modalStyles = {
    overflow: 'scroll',
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
};


export const AllRequests = () => {

    const user = UsersService.getFullUser()
    const [requests, setRequests] = React.useState([]);
    const [clickedRequest, setClickedRequest] = React.useState({});
    const [openModal, setOpenModal] = React.useState(false);


    const getData = () => {
        RequestsService.getAllRequests().then((response) => {
            const data = response.data;
            data.forEach((request) => {
                request.fullName = request.userDTO.firstName + ' ' + request.userDTO.lastName;
            })
            setRequests(response.data);
            console.log("RESPONSE DATA");
            console.log(data);
        });
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        getData();
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', flex: 1, maxWidth: 50},
        {field: 'fullName', headerName: 'Employee Name', flex: 1},
        {field: 'requestType', headerName: 'Request Type', flex: 1},
        {field: 'startDate', headerName: 'Start date', flex: 1, maxWidth: 100},
        {field: 'endDate', headerName: 'End Date', flex: 1, maxWidth: 100},
        {field: 'noOfDays', headerName: 'No. days', flex: 1, maxWidth: 100},
        {field: 'status', headerName: 'Status', flex: 1, maxWidth: 150},
        {
            field: "action",
            headerName: "",
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
                    setClickedRequest(requests.find(element => element.id === thisRow.id));
                    setOpenModal(true);
                };

                return <StyledButton onClick={onClick} sx={{width: '90%', height: '90%'}}>Open</StyledButton>;
            }
        },
    ];

    return (
        <>
            <Sidebar/>
            <ContentContainer sx={{padding: "0 0"}}>
                <div style={{height: '71vh', width: '100%'}}>
                    <DataGrid
                        columns={columns}
                        rows={requests}
                        pageSize={8}
                        getRowId={(row) => row.id}
                        rowsPerPageOptions={[5]}
                        initialState={{
                            sorting: {sortModel: [{field: "id", sort: "desc"}]}
                        }}
                    />
                </div>
                <Modal open={openModal} onClose={handleCloseModal} style={modalStyles}>
                    <ContentContainer sx={{marginTop: '10vh', alignItems: 'start', width: "90%"}}>
                        <ModalRequest request={clickedRequest} user={user} handleCloseModal={handleCloseModal}
                                      getData={getData}/>
                    </ContentContainer>
                </Modal>
            </ContentContainer>
            <Footer/>
        </>
    )
}
