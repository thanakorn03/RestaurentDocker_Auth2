import api from "./api";
import Tokenservice from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async (username, name, email, password) => {
    return await api.post(API_URL + "/register", {
        username,
        name,
        email,
        password
    });
};

const login = async (username, password) => {
    const response = await api.post(API_URL + "/signin", {
        username,
        password
    });
    if (response.data.accessToken) {
        Tokenservice.setUser(response.data);
    }
    return response;
};

const logout = () => {
    Tokenservice.removeUser();
    window.location.href = "/login"; // เพิ่ม redirect ไปหน้า login หลัง logout
};

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;