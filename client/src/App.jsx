import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import AddRestaurant from "./Pages/AddRestaurant";
import UpdateRestaurant from "./Pages/UpdateRestaurant";
import Search from "./Pages/Search";
import AboutUs from "./Pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/update-restaurant/:id" element={<UpdateRestaurant />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* Fallback route for 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;