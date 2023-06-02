import React from 'react';
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8082/';

class RequestsService {

    createNewRequest(request, user) {
        return axios.post(API_URL + 'file/generate-file', request, {headers: authHeader(), responseType: 'blob'})
            .then((response) => {
                const file = response.data;
                var fileURL = URL.createObjectURL(file);
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.download = request.documentType + "_" + user.firstName + "_" + user.lastName + "_" +
                    request.details.startDate + "_" + request.details.endDate;
                fileLink.click();
                window.open(URL.createObjectURL(response.data));
                console.log(response.headers);
            })
    };

}

export default new RequestsService();