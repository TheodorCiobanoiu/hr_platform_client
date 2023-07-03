import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8082/admin/';

class UsersService {

    getUserById(id) {
        axios.get(
            API_URL + 'get-user/by-id/' + id, {headers: authHeader()}
        ).then(async (response) => {
            await localStorage.setItem("full-user", JSON.stringify(response.data));
            return response.data;
        });
    }

    getGivenUserById(id) {
        return axios.get(API_URL + 'get-user/by-id/' + id, {headers: authHeader()}).then(response => {
            return response.data;
        });
    }

    getFullUser() {
        return JSON.parse(localStorage.getItem('full-user'));
    }
}

export default new UsersService();