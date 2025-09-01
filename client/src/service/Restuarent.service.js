import axios from "axios";

const API = axios.create({
  baseURL: "https://restaurentdocker-auth2.onrender.com/api/v1",
});

// เพิ่ม token อัตโนมัติถ้ามี
API.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

export const createRestaurant = (data) => API.post("/restaurants", data);
export const getAllRestaurants = () => API.get("/restaurants");
export const getRestaurantById = (id) => API.get(`/restaurants/${id}`);
export const updateRestaurant = (id, data) => API.put(`/restaurants/${id}`, data);
export const deleteRestaurant = (id) => API.delete(`/restaurants/${id}`);

export default { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
