import { Routes, Route, Navigate } from "react-router-dom";
import LecturerEvaluationFormPage from "./pages/LecturerEvaluationFormPage"
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="min-h-screen p-5">
      <Routes>
        <Route path="/" element={<Navigate to="/evaluate" />} />
        <Route
          path="/evaluate"
          element={<LecturerEvaluationFormPage />}
        ></Route>
        <Route
          path="/login"
          element={<LoginPage />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
