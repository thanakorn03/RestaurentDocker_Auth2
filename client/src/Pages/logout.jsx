import AuthService from "../service/auth.service";
import React from 'react';
import Swal from "sweetalert2";

const Logout = () => {
    const handleLogout = () => {
        AuthService.logout();
        Swal.fire({
            icon: "success",
            title: "ออกจากระบบสำเร็จ",
            timer: 1200,
            showConfirmButton: false,
        });
        // ไม่ต้อง navigate("/login") เพราะ AuthService.logout() จะ redirect ให้อยู่แล้ว
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;