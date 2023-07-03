import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8082/vacations/';


class VacationService {

    getAllVacations() {
        return axios
            .get(API_URL + 'all', {headers: authHeader()})
            .then((response) => {
                const fnsDates = [];
                const dates = response.data
                dates.forEach((date) => {
                    const fnsDate = new Date(date);
                    fnsDate.setHours(12, 0, 0, 0);
                    fnsDates.push(fnsDate);
                })
                return fnsDates;
            });
    }

    getAllVacationsForUser(userID) {
        return axios
            .get(API_URL + 'by-user/' + userID, {headers: authHeader()})
            .then((response) => {
                const fnsDates = [];
                const dates = response.data
                dates.forEach((date) => {
                    const fnsDate = new Date(date);
                    fnsDate.setHours(12, 0, 0, 0);
                    fnsDates.push(fnsDate);
                })
                return fnsDates;
            });
    }
}


export default new VacationService();