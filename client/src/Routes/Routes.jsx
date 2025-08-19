import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import AddRestaurant from "../Pages/AddRestaurant";
import UpdateRestaurant from "../Pages/UpdateRestaurant";
import Login from "../Pages/login";
import Register from "../Pages/register";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: 40 }}>
    <h2>404 - Page Not Found</h2>
    <p>ไม่พบหน้าที่คุณต้องการ</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/add-restaurant",
    element: <AddRestaurant />,
    errorElement: <NotFound />,
  },
  {
    path: "/update-restaurant/:id",
    element: <UpdateRestaurant />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;