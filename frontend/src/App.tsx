import { Routes, Route, Navigate } from "react-router-dom";
import LecturerEvaluationFormPage from "./pages/LecturerEvaluationFormPage";
import LoginPageStudent from "./pages/LoginPageStudent";
import LoginPageLecturer from "./pages/LoginPageLecturer";
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
        <Route path="/student-login" element={<LoginPageStudent />}></Route>
        <Route path="/lecturer-login" element={<LoginPageLecturer />}></Route>
        <Route path="/admin-login" element={<LoginPageAdmin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
