import { useContext, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = Cookies.get("username");
    if(username) {
      setUser({username});
    }
  }, []);

  const login = (username) => {
    Cookies.set("username", username, {expires: 7});
    setUser({username});
  };

  const logout = () => {
    Cookies.remove("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
