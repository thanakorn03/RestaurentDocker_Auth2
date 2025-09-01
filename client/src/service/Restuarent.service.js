import api from "./api";

const API_URL = "/restaurants";

export const createRestaurant = (data) => api.post(API_URL, data);
export const getAllRestaurants = () => api.get(API_URL);
export const getRestaurantById = (id) => api.get(`${API_URL}/${id}`);
export const updateRestaurant = (id, data) => api.put(`${API_URL}/${id}`, data);
export const deleteRestaurant = (id) => api.delete(`${API_URL}/${id}`);

export default { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };
