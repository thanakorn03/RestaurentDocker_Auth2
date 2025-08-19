import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Restaurant from "../Component/Restaurant";
import RestaurantService from "../service/Restuarent.service";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");
  const { user, loading } = useAuthContext(); // เพิ่ม loading
  const isLoggedIn = !!user;

  // Debug
  useEffect(() => {
    console.log("🔍 Home Debug - User:", user);
    console.log("🔍 Home Debug - Loading:", loading);
    console.log("🔍 Home Debug - IsLoggedIn:", isLoggedIn);
  }, [user, loading, isLoggedIn]);

  const fetchRestaurants = async () => {
    if (!isLoggedIn) {
      setRestaurants([]);
      return;
    }

    setLoadingRestaurants(true);
    setError("");
    try {
      const response = await RestaurantService.getAllRestaurants();
      console.log("📊 API Response:", response);
      setRestaurants(response.data || []);
    } catch (err) {
      console.error("❌ Error fetching restaurants:", err);
      setError("ไม่สามารถโหลดข้อมูลร้านอาหารได้");
      setRestaurants([]);
    }
    setLoadingRestaurants(false);
  };

  useEffect(() => {
    if (!loading) { // รอให้ auth loading เสร็จก่อน
      fetchRestaurants();
    }
  }, [isLoggedIn, loading]);

  // แสดง loading ขณะที่กำลังโหลด auth
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p>กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Grab Restaurant
        </h1>
        
        {!isLoggedIn ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">
              กรุณาเข้าสู่ระบบเพื่อดูรายการร้านอาหาร
            </h2>
            <p className="text-gray-600 mb-8">
              เข้าสู่ระบบแล้วจะสามารถดูและจัดการร้านอาหารได้
            </p>
            <div className="space-x-4">
              <a href="/login" className="btn btn-primary">
                เข้าสู่ระบบ
              </a>
              <a href="/register" className="btn btn-outline btn-secondary">
                สมัครสมาชิก
              </a>
            </div>
          </div>
        ) : (
          <div>
            {loadingRestaurants && (
              <div className="text-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
                <p>กำลังโหลดข้อมูล...</p>
              </div>
            )}
            
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            
            {!loadingRestaurants && !error && (
              <Restaurant restaurants={restaurants} onRefresh={() => fetchRestaurants()} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;