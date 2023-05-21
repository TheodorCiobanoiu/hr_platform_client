import Footer from "./footer";
import Header from "./header";
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {DataGrid, GridApi, GridCellValue, GridColDef} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import RecommendationService from "../services/recommendation.service";

export default function StatusRecommendations() {
    const [data, setData] = useState([]);
    const columns: GridColDef[] = [
        {field: 'userID', headerName: 'ID'},
        {field: 'firstName', headerName: 'First Name'},
        {field: 'lastName', headerName: 'Last Name'},
        {field: 'email', headerName: 'Email', width: 300},
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

                    return alert(JSON.stringify(thisRow, null, 4));
                };

                return <Button onClick={onClick}>Click</Button>;
            }
        },
    ];

    const getData = () => {
        RecommendationService.getAllRecommendations().then((response) => {
            const allData = response.data;
            console.log("Inside getData(): allData variable: ")
            console.log(allData);
            setData(allData);
        }).catch(error => console.error(error));
    };
    useEffect(() => {
        getData();
        console.log("DATA OBJECT: ");
        console.log(data);
    }, []);
    return (

        <Box p="5">
            <Header/>
            <div style={{height: 700, width: '100%'}}>
                <DataGrid
                    style={{color: "black", backgroundColor: "white"}}
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row.userID}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{newEditingApi: true}}

                />
            </div>
            <Box sx={{mt: 0, mb: 0}}>
                <Footer/>
            </Box>
        </Box>
    );
}