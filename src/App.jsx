import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./components/pages/login/LoginPage.jsx";
import HomePage from "./components/pages/home/HomePage.jsx";
import ErrorPage from "./components/pages/error/ErrorPage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
