import { Routes, Route, Navigate } from "react-router-dom";
import LecturerEvaluationFormPage from "./pages/LecturerEvaluationFormPage";
import LecturerDashboardPage from "./pages/LecturerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import VerifyRecordsPageStudent from "./pages/VerifyRecordsPageStudent";
import VerifyRecordsPageLecturer from "./pages/VerifyRecordsPageLecturer";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import ResetPasswordPageStudent from "./pages/ResetPasswordPageStudent";
import ResetPasswordPageLecturer from "./pages/ResetPasswordPageLecturer";
import ResetPasswordPageAdmin from "./pages/ResetPasswordPageAdmin";
import LoginPageLecturer from "./pages/LoginPageLecturer";
import LoginPageStudent from "./pages/LoginPageStudent";
import LoginPageAdmin from "./pages/LoginPageAdmin";
import PublicRouteComponent from "./components/PublicRouteComponent";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent";

function App() {
  return (
    <div className="min-h-screen p-5">
      <Routes>
        <Route path="/" element={<Navigate to="/student/evaluate" />} />

        <Route
          path="/student/evaluate"
          element={
            <ProtectedRouteComponent>
              <LecturerEvaluationFormPage />
            </ProtectedRouteComponent>
          }
        ></Route>

        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRouteComponent>
              <LecturerDashboardPage />
            </ProtectedRouteComponent>
          }
        ></Route>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouteComponent>
              <AdminDashboardPage />
            </ProtectedRouteComponent>
          }
        ></Route>

        <Route
          path="/admin-login"
          element={
            <PublicRouteComponent>
              <LoginPageAdmin />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/lecturer-login"
          element={
            <PublicRouteComponent>
              <LoginPageLecturer />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/student-login"
          element={
            <PublicRouteComponent>
              <LoginPageStudent />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/verify-student"
          element={
            <PublicRouteComponent>
              <VerifyRecordsPageStudent />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/verify-lecturer"
          element={
            <PublicRouteComponent>
              <VerifyRecordsPageLecturer />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/create-password"
          element={
            <PublicRouteComponent>
              <CreatePasswordPage />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/reset-password-student"
          element={
            <PublicRouteComponent>
              <ResetPasswordPageStudent />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/reset-password-lecturer"
          element={
            <PublicRouteComponent>
              <ResetPasswordPageLecturer />
            </PublicRouteComponent>
          }
        ></Route>

        <Route
          path="/reset-password-admin"
          element={
            <PublicRouteComponent>
              <ResetPasswordPageAdmin />
            </PublicRouteComponent>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
