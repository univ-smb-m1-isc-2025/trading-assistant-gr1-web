import "./App.css";
import LoginPage from "./components/pages/login/LoginPage.jsx";
import HomePage from "./components/pages/home/HomePage.jsx";
import ErrorPage from "./components/pages/error/ErrorPage.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./components/pages/signup/SignUpPage.jsx";
import ProfilePage from "./components/pages/profile/ProfilePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redirection */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
