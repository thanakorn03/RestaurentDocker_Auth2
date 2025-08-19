import api from "./api";

// Fallback ถ้า env variable ไม่มี
const RESTAURANT_API = import.meta.env.VITE_RESTAURANT_API || "/restaurants";

console.log("🔍 RESTAURANT_API:", RESTAURANT_API); // Debug env variable

const getAllRestaurants = async () => {
    try {
        console.log("🌐 API Call: GET", RESTAURANT_API);
        const res = await api.get(RESTAURANT_API);
        console.log("📊 Raw API Response:", res);
        console.log("📊 Response Data:", res.data);
        console.log("📊 Data Type:", typeof res.data);
        
        // Return ทั้ง response object แทน res.data
        return res;
    } catch (error) {
        console.error("❌ getAllRestaurants Error:", error);
        console.error("❌ Error Response:", error.response);
        throw error;
    }
};

const getRestaurantById = async (id) => {
    try {
        console.log(`🌐 API Call: GET ${RESTAURANT_API}/${id}`);
        const res = await api.get(`${RESTAURANT_API}/${id}`);
        return res;
    } catch (error) {
        console.error("❌ getRestaurantById Error:", error);
        throw error;
    }
};

const editRestaurantById = async (id, restaurantData) => {
    try {
        console.log(`🌐 API Call: PUT ${RESTAURANT_API}/${id}`);
        const res = await api.put(`${RESTAURANT_API}/${id}`, restaurantData);
        return res;
    } catch (error) {
        console.error("❌ editRestaurantById Error:", error);
        throw error;
    }
};

const insertRestaurant = async (restaurantData) => {
    try {
        console.log(`🌐 API Call: POST ${RESTAURANT_API}`);
        const res = await api.post(RESTAURANT_API, restaurantData);
        return res;
    } catch (error) {
        console.error("❌ insertRestaurant Error:", error);
        throw error;
    }
};

const deleteRestaurantById = async (id) => {
    try {
        console.log(`🌐 API Call: DELETE ${RESTAURANT_API}/${id}`);
        const res = await api.delete(`${RESTAURANT_API}/${id}`);
        return res;
    } catch (error) {
        console.error("❌ deleteRestaurantById Error:", error);
        throw error;
    }
};

const RestaurantService = {
    getAllRestaurants,
    getRestaurantById,
    editRestaurantById,
    insertRestaurant,
    deleteRestaurantById
};

export default RestaurantService;