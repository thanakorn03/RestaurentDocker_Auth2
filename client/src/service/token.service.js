export const getUser = () => {
  const userData = localStorage.getItem("user");
  if (!userData || userData === "undefined" || userData === "null") return null;
  try { return JSON.parse(userData); } 
  catch { localStorage.removeItem("user"); return null; }
};

export const setUser = (user) => user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("user");

export const getLocalAccessToken = () => getUser()?.accessToken || null;

export const removeUser = () => localStorage.removeItem("user");

export default { getUser, setUser, getLocalAccessToken, removeUser };
