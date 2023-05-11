import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8082/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, username, phone, email, password) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            username,
            phone,
            email,
            password
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
}

export default new AuthService();
