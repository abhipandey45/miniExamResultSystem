import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [adminInfo, setAdminInfo] =
    useState(null);

  useEffect(() => {
    const storedAdmin =
      localStorage.getItem("adminInfo");
    if (storedAdmin) {
      setAdminInfo(
        JSON.parse(storedAdmin)
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "adminInfo"
    );
    setAdminInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        adminInfo,
        setAdminInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);