import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import AdminService from "../services/admin.service";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {ContentContainer} from "./components/StyledComponents";

export default function StatusRecommendations() {
    const [data, setData] = useState([]);
    console.log("INSIDE ALL USERS COMPONENTS");
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', maxWidth: 50, hide: true, flex: 1},
        {field: 'userID', headerName: 'Id', flex: 1},
        {field: 'firstName', headerName: 'First Name', flex: 1},
        {field: 'lastName', headerName: 'Last Name', flex: 1},
        {
            field: 'roles',
            headerName: 'Role',
            width: 180,
            flex: 1,
            renderCell: params => (
                <ul className="flex">
                    {params.value.map((role, index) => (
                        <li key={index}>{role.name}</li>
                    ))}
                </ul>
            ),
            type: 'string'
        },
        {field: 'username', headerName: 'Username', width: 300, flex: 1},
        {field: 'email', headerName: 'Email', width: 300, flex: 1, minWidth: 300},

    ];

    const getData = async () => {
        await AdminService.getAllUsers().then((response) => {
            const allData = response.data;
            console.log("Inside getData(): allData variable: ")
            setData(allData);
            console.log(data);


        }).catch(error => console.error(error));
    };
    useEffect(() => {
        getData();
        console.log("DATA OBJECT: ");
        console.log(data);
    }, []);

    // return (
    //
    //     <Box p="5">
    //         <Sidebar/>
    //         <div style={{height: 700, width: '100%'}}>
    //             <DataGrid
    //                 autoHeight={true}
    //                 autoPageSize={true}
    //                 style={{color: "black", backgroundColor: "white"}}
    //                 rows={data}
    //                 columns={columns}
    //                 pageSize={5}
    //                 getRowId={(row) => row.userID}
    //                 rowsPerPageOptions={[5]}
    //                 checkboxSelection
    //                 disableSelectionOnClick
    //                 experimentalFeatures={{newEditingApi: true}}
    //             />
    //         </div>
    //         <Box sx={{mt: 0, mb: 0}}>
    //             <Footer/>
    //         </Box>
    //     </Box>
    //
    // );

    return (

        <Box p="5">
            <Sidebar/>
            <ContentContainer>
                <div style={{height: '71vh', width: '100%'}}>
                    <DataGrid
                        autoHeight={true}
                        autoPageSize={true}
                        style={{color: "black", backgroundColor: "white"}}
                        rows={data}
                        columns={columns}
                        pageSize={8}
                        getRowId={(row) => row.userID}
                        rowsPerPageOptions={[5]}
                        experimentalFeatures={{newEditingApi: true}}
                    />
                </div>
            </ContentContainer>
        </Box>

    );
}