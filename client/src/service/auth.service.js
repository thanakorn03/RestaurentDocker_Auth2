import axios from "axios";

const API_URL = "https://restaurentdocker-auth2.onrender.com/api/v1/auth/";

const login = (username, password) => {
  return axios.post(API_URL + "signin", { username, password }, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
};

const register = (data) => {
  return axios.post(API_URL + "register", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
};

const authService = { login, register };
export default authService;
