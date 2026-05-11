import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentsPage from "./pages/students/StudentsPage";
import StudentFormPage from "./pages/students/StudentFormPage";
import SubjectsPage from "./pages/subjects/SubjectsPage";
import SubjectFormPage from "./pages/subjects/SubjectFormPage";
import ResultsPage from "./pages/results/ResultsPage";
import ResultFormPage from "./pages/results/ResultFormPage";
import ResultDetailPage from "./pages/results/ResultDetailPage";



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
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/add"
        element={
          <ProtectedRoute>
            <StudentFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/edit/:id"
        element={
          <ProtectedRoute>
            <StudentFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <SubjectsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects/add"
        element={
          <ProtectedRoute>
            <SubjectFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects/edit/:id"
        element={
          <ProtectedRoute>
            <SubjectFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results/add"
        element={
          <ProtectedRoute>
            <ResultFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results/:id"
        element={
          <ProtectedRoute>
            <ResultDetailPage />
          </ProtectedRoute>
        }
      />

    </Routes>

  );

};

export default App;