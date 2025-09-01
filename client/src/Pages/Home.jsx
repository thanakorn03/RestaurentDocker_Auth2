import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Restaurant from "../Component/Restaurant";
import RestaurantService from "../service/Restuarent.service";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");
  const { user, loading } = useAuthContext();
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    if (!isLoggedIn) return;
    setLoadingRestaurants(true);
    setError("");
    try {
      const res = await RestaurantService.getAllRestaurants();
      setRestaurants(res.data || []);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลร้านอาหารได้");
    }
    setLoadingRestaurants(false);
  };

  useEffect(() => {
    if (!loading) fetchRestaurants();
  }, [isLoggedIn, loading]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Grab Restaurant
        </h1>

        {!loadingRestaurants && !error && (
          <Restaurant
            restaurants={restaurants}
            onRefresh={() => fetchRestaurants()}
          />
        )}

        {error && <div className="alert alert-error">{error}</div>}
      </div>
    </div>
  );
};

export default Home;
