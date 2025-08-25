import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../service/auth.service'
import Swal from "sweetalert2";
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuthContext(); // ใช้ logout จาก context
  const isLoggedIn = !!user; 
  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  Swal.fire({
    icon: "success",
    title: "ออกจากระบบสำเร็จ",
    timer: 1200,
    showConfirmButton: false,
  }).then(() => {
    navigate("/login");
  });
};

  const MenuItem = [
    { name: "Home", url: "/" },
    { name: "Restaurants", url: "/restaurants" },
    ...(isLoggedIn
      ? [{ name: "Logout", url: "/logout", onClick: handleLogout }]
      : [
          { name: "Login", url: "/login" },
          { name: "Register", url: "/register" }
        ])
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {MenuItem.map((item, index) => (
              <li key={index}>
                {item.name === "Logout" ? (
                  <button onClick={item.onClick}>{item.name}</button>
                ) : (
                  <Link to={item.url}>{item.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          Grab Restaurant
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        <Link to="/add-restaurant" className="btn btn-outline btn-primary">
          Add restaurant
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-secondary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-success">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
export default Navbar;