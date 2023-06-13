import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8082/admin/';


class AdminService {
    getAllUsers() {
        return axios.get("http://localhost:8082/admin/all-users", {headers: authHeader()});
    }

    deleteUser(username) {
        const requesterId = AuthService.getCurrentUser().id;
        console.log(username);
        console.log(username);
        return axios.delete(API_URL + 'delete-user/' + username.username + '/' + requesterId, {headers: authHeader()});
    }

    getAllHolidays() {
        return axios
            .get(API_URL + 'get-all-holidays', {headers: authHeader()})
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

    getOverviewMessage(userID) {
        return axios
            .get(API_URL + 'get-overview-message/' + userID, {headers: authHeader()})
            .then((response) => {
                return response.data;
            });
    }
}


export default new AdminService();