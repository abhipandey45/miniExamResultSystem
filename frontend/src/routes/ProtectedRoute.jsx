import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";



const ProtectedRoute = ({
  children,
}) => {

  const { adminInfo } = useAuth();

  if (!adminInfo) {

    return <Navigate to="/login" />;

  }

  return children;

};

export default ProtectedRoute;