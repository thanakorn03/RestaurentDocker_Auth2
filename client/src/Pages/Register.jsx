import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../service/auth.service";
import "../Register.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    console.log('Sending data:', form); // Debug payload
    
    const response = await fetch('http://localhost:5000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    console.log('Response status:', response.status); // Debug status
    console.log('Response headers:', response.headers); // Debug headers
    
    // ตรวจสอบ response text ก่อน parse JSON
    const responseText = await response.text();
    console.log('Response text:', responseText); // Debug response
    
    let data = {};
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('Server returned invalid JSON: ' + responseText);
      }
    }

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        text: "กรุณาเข้าสู่ระบบ",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } else {
      setError(data.message || "Register failed");
      Swal.fire({
        icon: "error",
        title: "สมัครสมาชิกไม่สำเร็จ",
        text: data.message || "Register failed",
      });
    }
  } catch (err) {
    console.error('Register error:', err);
    const msg = err.message || "Network error";
    setError(msg);
    Swal.fire({
      icon: "error",
      title: "สมัครสมาชิกไม่สำเร็จ",
      text: msg,
    });
  }
  setLoading(false);
};

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
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
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
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
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="login-link">
        มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </div>
    </div>
  );
};
export default Register;