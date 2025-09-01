import { createContext, useContext, useState } from "react";
import TokenService from "../service/token.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(TokenService.getUser());

  const login = (userData) => setUser(userData);
  const logout = () => { TokenService.removeUser(); setUser(null); window.location.href="/login"; };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
