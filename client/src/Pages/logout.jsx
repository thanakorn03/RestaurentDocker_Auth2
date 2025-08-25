import AuthService from "../service/auth.service";
import React from 'react';
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // อัปเดต context และ localStorage
        Swal.fire({
            icon: "success",
            title: "ออกจากระบบสำเร็จ",
            timer: 1200,
            showConfirmButton: false,
        });
        navigate("/login"); // redirect ไปหน้า login
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;