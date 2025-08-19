// token.service.js
export const getUser = () => {
  const userData = localStorage.getItem("user");
  console.log("🔍 getUser - Raw data:", userData); // Debug
  
  if (!userData || userData === "undefined" || userData === "null") {
    console.log("🔍 getUser - No valid data found"); // Debug
    return null;
  }
  
  try {
    const parsed = JSON.parse(userData);
    console.log("🔍 getUser - Parsed data:", parsed); // Debug
    return parsed;
  } catch (error) {
    console.error("❌ Error parsing user data:", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const setUser = (user) => {
  console.log("🔍 setUser called with:", user); // Debug
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log("✅ User saved to localStorage"); // Debug
  } else {
    localStorage.removeItem("user");
    console.log("🗑️ User removed from localStorage"); // Debug
  }
};

export const getLocalAccessToken = () => {
  const user = getUser();
  const token = user?.accessToken || null;
  console.log("🔍 getLocalAccessToken - Token:", token ? "✅ Found" : "❌ Not found"); // Debug
  return token;
};

export const getLocalRefreshToken = () => {
  const user = getUser();
  return user?.refreshToken || null;
};

export const updateLocalAccessToken = (token) => {
  let user = getUser();
  if (user) {
    user.accessToken = token;
    setUser(user);
  }
};

export const removeUser = () => {
  console.log("🗑️ removeUser called"); // Debug
  localStorage.removeItem("user");
};

export default {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};