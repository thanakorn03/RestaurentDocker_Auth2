import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../service/auth.service";
import Tokenservice from "../service/token.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // เพิ่ม loading state

    // โหลด user จาก localStorage เมื่อ app เริ่มต้น
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const savedUser = Tokenservice.getUser();
                console.log("🔍 InitializeAuth - Saved user:", savedUser);
                if (savedUser && savedUser.accessToken) {
                    setUser(savedUser);
                    console.log("✅ User loaded from localStorage");
                } else {
                    console.log("❌ No valid user in localStorage");
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                Tokenservice.removeUser(); // ลบข้อมูลที่เสีย
            }
            setLoading(false);
        };

        initializeAuth();
    }, []); // รันครั้งเดียวเมื่อ component mount

    const login = (userData) => {
        console.log("🔐 Login called with:", userData);
        setUser(userData);
        Tokenservice.setUser(userData);
    };

    const logout = () => {
    AuthService.logout();
    setUser(null);
    Tokenservice.removeUser();
    };

    // ลบ useEffect เก่าออก เพราะจะทำให้ infinite loop
    // useEffect(() => {
    //     Tokenservice.setUser(user);
    // }, [user]);

    const getUser = async () => {
        const currentUser = Tokenservice.getUser();
        return currentUser;
    };

    const value = {
        user,
        login,
        logout,
        getUser,
        setUser,
        loading // เพิ่ม loading เพื่อให้ components รอได้
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);