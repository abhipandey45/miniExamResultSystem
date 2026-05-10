import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import ProtectedRoute from "./routes/ProtectedRoute";



const App = () => {

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />



      <Route
        path="/login"
        element={<LoginPage />}
      />



      <Route
        path="/dashboard"
        element={

          <ProtectedRoute>

            <DashboardPage />

          </ProtectedRoute>

        }
      />

    </Routes>

  );

};

export default App;