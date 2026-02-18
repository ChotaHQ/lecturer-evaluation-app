import { Routes, Route, Navigate } from "react-router-dom";
import LecturerEvaluationFormPage from "./pages/LecturerEvaluationFormPage";
import VerifyRecordsPageStudent from "./pages/VerifyRecordsPageStudent";
import VerifyRecordsPageLecturer from "./pages/VerifyRecordsPageLecturer";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import ResetPasswordPageStudent from "./pages/ResetPasswordPageStudent";
import ResetPasswordPageLecturer from "./pages/ResetPasswordPageLecturer";
import ResetPasswordPageAdmin from "./pages/ResetPasswordPageAdmin";
import LoginPageLecturer from "./pages/LoginPageLecturer";
import LoginPageStudent from "./pages/LoginPageStudent";
import LoginPageAdmin from "./pages/LoginPageAdmin";

function App() {
  return (
    <div className="min-h-screen p-5">
      <Routes>
        <Route path="/" element={<Navigate to="/evaluate" />} />
        <Route
          path="/evaluate"
          element={<LecturerEvaluationFormPage />}
        ></Route>
        <Route path="/admin-login" element={<LoginPageAdmin />}></Route>
        <Route path="/lecturer-login" element={<LoginPageLecturer />}></Route>
        <Route path="/student-login" element={<LoginPageStudent />}></Route>
        <Route
          path="/verify-student"
          element={<VerifyRecordsPageStudent />}
        ></Route>
        <Route
          path="/verify-lecturer"
          element={<VerifyRecordsPageLecturer />}
        ></Route>
        <Route path="/create-password" element={<CreatePasswordPage />}></Route>
        <Route
          path="/reset-password-student"
          element={<ResetPasswordPageStudent />}
        ></Route>
        <Route
          path="/reset-password-lecturer"
          element={<ResetPasswordPageLecturer />}
        ></Route>
        <Route
          path="/reset-password-admin"
          element={<ResetPasswordPageAdmin />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
