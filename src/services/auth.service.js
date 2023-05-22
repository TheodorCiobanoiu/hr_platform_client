import axios from "axios";
import authHeader from "./auth-header";
import * as React from "react";

const API_URL = "http://localhost:8082/api/auth/";

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

    checkForUser() {
        const user = this.getCurrentUser();
        console.log(user);
        console.log(user.token.length === 0);
        return (user.token.length === 0);
    }

}

export default new AuthService();
