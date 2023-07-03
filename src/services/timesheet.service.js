import React from 'react';
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8082/';

class TimesheetService {

    createNewTimesheet(timesheet) {
        return axios.post(API_URL + 'timesheet/save', timesheet, {headers: authHeader()})
            .then((response) => {

            })
    };

    getUserTimesheet(userId) {
        return axios.get(API_URL + 'timesheet/get/' + userId, {headers: authHeader()});
    }

    getUserTimesheetByMonth(month, userId) {
        return axios.get(API_URL + 'timesheet/get/' + month + "/" + userId, {headers: authHeader()});
    }

    getAllTimesheets() {
        return axios.get(API_URL + 'timesheet/get/all', {headers: authHeader()});
    }

    getDataForGivenMonth(month) {
        return axios.get(API_URL + "timesheet/monthly-data/" + month, {headers: authHeader()})
            .then((response) => {
                return response.data;
            })
    }

}

export default new TimesheetService();