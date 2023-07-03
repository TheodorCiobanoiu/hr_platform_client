import axios from "axios";
import authHeader from "./auth-header";
import UsersService from "./users.service";
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:8082/api/auth/";
const API_URL_CHECK_TOKEN = "http://localhost:8082/admin/check-token";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(async (response) => {
                if (response.data.token) {
                    await localStorage.setItem("user", JSON.stringify(response.data));
                    console.log("User added to local storage");
                }
                await UsersService.getUserById(response.data.id);
                console.log("Full user added to local storage");
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("full-user");
    }

    register(firstName, lastName, username, phone, email, password, department, jobType) {
        const userDetailsDTO = {
            department: department,
            jobType: jobType
        }
        console.log(userDetailsDTO);
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            username,
            phone,
            email,
            password,
            userDetailsDTO
        }, {headers: authHeader()});
    }

    getCurrentUser() {
        if ((JSON.parse(localStorage.getItem('user'))) == null) {
            const defaultValues = {
                token: "",
                type: "",
                id: "",
                username: "",
                email: "",
                roles: [],
            };
            localStorage.setItem("user", JSON.stringify(defaultValues));
        }
        return JSON.parse(localStorage.getItem('user'));
    }

    // Check to see if token is expired   WIP
    async checkToken() {
        var checker = false;
        await axios.get(API_URL_CHECK_TOKEN, {headers: authHeader()})
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
                checker = true;
                useNavigate("/login", {replace: true});
            });
        console.log("checker");
        console.log(checker);
        return checker;
    }

    checkForUser() {
        const user = this.getCurrentUser();
        return (user.token.length === 0);
    }

}

export default new AuthService();
