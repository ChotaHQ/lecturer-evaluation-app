import { Routes, Route, Navigate } from "react-router-dom";
import LecturerEvaluationFormPage from "./pages/LecturerEvaluationFormPage";
import LoginPage from "./pages/LoginPage";
import VerifyRecordsPageStudent from "./pages/VerifyRecordsPageStudent";
import VerifyRecordsPageLecturer from "./pages/VerifyRecordsPageLecturer";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <div className="min-h-screen p-5">
      <Routes>
        <Route path="/" element={<Navigate to="/evaluate" />} />
        <Route
          path="/evaluate"
          element={<LecturerEvaluationFormPage />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/verify-student"
          element={<VerifyRecordsPageStudent />}
        ></Route>
        <Route
          path="/verify-lecturer"
          element={<VerifyRecordsPageLecturer />}
        ></Route>
        <Route
          path="/create-password"
          element={<CreatePasswordPage />}
        ></Route>
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
