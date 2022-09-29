import axios from "axios";

export const api = axios.create({
    baseURL: 'https://6335ec5d8aa85b7c5d258e07.mockapi.io',
    headers: {
        'Content-Type': 'application/json'
    }
}); 