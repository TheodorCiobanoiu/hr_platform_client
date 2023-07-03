import Footer from "./components/footer";
import {Backdrop, Modal} from "@mui/material";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";

import RecommendationService from "../services/recommendation.service";
import ModalRecommendation from "./components/ModalRecommendation";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ContentContainer, StyledButton} from "./components/StyledComponents";
import AuthService from "../services/auth.service";

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '90%',
    height: '90vh',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const containerStyle = {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
    },
}

export default function YourRecommendations() {
    let [recommendation, setRecommendation] = useState([]);
    let [open, setOpen] = useState(false);
    let [currentRecommendation, setCurrentRecommendation] = useState({});


    const handleClose = () => {
        setOpen(false);
    };
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', flex: 1, maxWidth: 50},
        {
            field: 'fullName', headerName: 'Candidate Name', flex: 1, valueGetter: (params) => {
                return (params.row.candidateFirstName + " " + params.row.candidateLastName);
            }
        },
        {field: "candidateEmail", headerName: "Email", width: 300},
        {field: "progressStatus", headerName: "Status", width: 180},
        {
            field: "userFullName",
            headerName: "Employee Name",
            width: 200,
        },
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
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    console.log("currentRecommendation: ");
                    setCurrentRecommendation(
                        recommendation.find((element) => element.id === thisRow.id)
                    );
                    console.log(currentRecommendation);
                    setOpen(true);
                };

                return <StyledButton onClick={onClick} sx={{width: '90%', height: '90%'}}>open</StyledButton>;
            },
        },
    ];

    const handleStatusChange = async (e) => {
        const {name, value} = e.target;
        let recommendationStatus = '';
        switch (value) {
            case("Reviewed"):
                recommendationStatus = 'Reviewed';
                await RecommendationService.changeRecommendationStatus(currentRecommendation.id, recommendationStatus);
                break;
            case("In progress"):
                recommendationStatus = 'In_Progress';
                await RecommendationService.changeRecommendationStatus(currentRecommendation.id, recommendationStatus);
                break;
            case("Accepted"):
                recommendationStatus = 'Accepted';
                await RecommendationService.changeRecommendationStatus(currentRecommendation.id, recommendationStatus);
                break;
            case("Rejected"):
                recommendationStatus = 'Rejected';
                await RecommendationService.changeRecommendationStatus(currentRecommendation.id, recommendationStatus);
                break;
            default:
                recommendationStatus = 'Reviewed';
                await RecommendationService.changeRecommendationStatus(currentRecommendation.id, recommendationStatus);
                console.log("Status changed!");
        }
        await getData();
        setOpen(false);
        // await setCurrentRecommendation(recommendation.find((element) => element.id === currentRecommendation.id));
    }

    const getData = async () => {
        const user = AuthService.getCurrentUser();
        console.log(window.location.pathname);
        if (window.location.pathname === '/recommendations/all' && (user.roles[0] === 'ROLE_HR' || user.roles[0] === 'ROLE_ADMIN')) {
            console.log("HERE");
            await RecommendationService.getAllRecommendations()
                .then(async (response) => {
                    const data = response.data;
                    await setRecommendation(data);
                })
                .catch((error) => console.log(error));
        } else {
            await RecommendationService.getRecommendationsById(user.id).then((response) => {
                const data = response.data;
                setRecommendation(data);
            }).catch(error => console.log(error));
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box p="5">
            <Sidebar/>
            <ContentContainer>
                <div style={{height: '71vh', width: '100%'}}>
                    <DataGrid
                        rows={recommendation}
                        columns={columns}
                        pageSize={8}
                        getRowId={(row) => row.id}
                        rowsPerPageOptions={[5]}
                        initialState={{
                            sorting: {sortModel: [{field: "id", sort: "desc"}]}
                        }}
                    />
                </div>
                <Backdrop open={open} onClick={handleClose}>
                    <Modal open={open} style={modalStyles} onClick={(e) => e.stopPropagation()}>
                        <ContentContainer sx={containerStyle}>
                            <Box p={2}>
                                <ModalRecommendation recommendation={currentRecommendation} getData={getData}
                                                     handleInputChange={handleStatusChange}
                                                     pathName={window.location.pathname}/>
                            </Box>
                        </ContentContainer>
                    </Modal>
                </Backdrop>
            </ContentContainer>
            <Box sx={{mt: 0, mb: 0}}>
                <Footer/>
            </Box>
        </Box>
    );
}
