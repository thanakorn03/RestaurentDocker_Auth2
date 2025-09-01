import api from "./api";
import TokenService from "./token.service";

const API_URL = "/auth";

const register = (username, name, email, password) =>
  api.post(`${API_URL}/register`, { username, name, email, password });

const login = async (username, password) => {
  const res = await api.post(`${API_URL}/signin`, { username, password });
  if (res.data.accessToken) TokenService.setUser(res.data);
  return res;
};

const logout = () => {
  TokenService.removeUser();
  window.location.href = "/login";
};

export default { register, login, logout };
