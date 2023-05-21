import Footer from "./footer";
import {Modal} from "@mui/material";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import RecommendationService from "../services/recommendation.service";
import ModalRecommendation from "./modalRecommendation";
import {Sidebar} from "./components/Sidebar/Sidebar";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const modalStyles = {
    overflow: 'scroll',
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
};
export default function StatusRecommendations() {
    let [recommendation, setRecommendation] = useState([]);
    let [open, setOpen] = useState(false);
    let [currentRecommendation, setCurrentRecommendation] = useState({});

    const handleClose = () => {
        setOpen(false);
    };
    const columns: GridColDef[] = [
        {field: "id", headerName: "Id", width: 50},
        {field: "candidateFirstName", headerName: "First Name"},
        {field: "candidateLastName", headerName: "Last Name"},
        {field: "candidateEmail", headerName: "Email", width: 300},
        {field: "progressStatus", headerName: "Status", width: 180},
        {
            field: "userFullName",
            headerName: "Employee Name",
            width: 180,
        },
        {
            field: "action",
            headerName: "Action",
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

                return <Button onClick={onClick}>Click</Button>;
            },
        },
    ];

    const handleStatusChange = async (e) => {
        const {name, value} = e.target;
        let recommendationStatus='';
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

    const getData = () => {
        RecommendationService.getAllRecommendations()
            .then(async (response) => {
                const data = response.data;
                console.log("Inside getData(): allData variable: ");
                console.log(data);
                await setRecommendation(data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
        console.log("Recommendation objects:");
        console.log(recommendation);
    }, []);

    return (
        <Box p="5">
            <Sidebar/>
            <div style={{height: 700, width: "100%"}}>
                <DataGrid
                    style={{color: "black", backgroundColor: "white"}}
                    rows={recommendation}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row) => row.id}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}
                />
                <Modal
                    style={modalStyles}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >

                    <Box sx={{...style, width: "80%", marginTop: "320px"}}>
                        <h2 id="parent-modal-title">
                            Recommendation #{currentRecommendation.id}:{" "}
                            {currentRecommendation.candidateFirstName}{" "}
                            {currentRecommendation.candidateLastName}{" "}
                        </h2>
                        <div id="parent-modal-description">
                            <ModalRecommendation recommendation={currentRecommendation} getData={getData}
                                                 handleInputChange={handleStatusChange}/>
                        </div>
                    </Box>
                </Modal>
            </div>
            <Box sx={{mt: 0, mb: 0}}>
                <Footer/>
            </Box>
        </Box>
    );
}
