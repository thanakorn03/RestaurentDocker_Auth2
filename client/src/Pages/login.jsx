import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
import Swal from "sweetalert2";
import "../login.css";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext(); // เปลี่ยนเป็น login แทน setUser

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      console.log('🔐 Attempting login...', form); // Debug
      const res = await AuthService.login(form.username, form.password);
      console.log('🔐 Login response:', res); // Debug
      
      if (res && res.data && res.data.accessToken) {
        // ใช้ login function จาก context
        login(res.data);
        console.log('✅ Context updated with user data'); // Debug
        
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1200,
          showConfirmButton: false,
        });
        navigate("/");
      } else {
        const errorMsg = res?.data?.message || "Login failed - Invalid credentials";
        setError(errorMsg);
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: errorMsg,
        });
      }
    } catch (err) {
      console.error('❌ Login error:', err); // Debug
      
      let msg = "Network error";
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message) {
        msg = err.message;
      }
      
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: msg,
      });
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
      </div>
    </div>
  );
};
export default Login;