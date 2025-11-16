import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './assets/style.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ConfirmationModal from "./components/ConfirmationModal";

import Home from "./pages/Home";
import TakeSurvey from "./pages/TakeSurvey";
import Submissions from "./pages/Submissions";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import EnterEmail from "./pages/EnterEmail";
import ForgotPass from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPass";

export default function App() {
  // Persisted authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Persisted login/signup toggle
  const [showLogin, setShowLogin] = useState(() => {
    const saved = localStorage.getItem("showLogin");
    return saved === null ? true : saved === "true";
  });

  const [forgotStep, setForgotStep] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Persist login/signup toggle
  useEffect(() => {
    localStorage.setItem("showLogin", showLogin ? "true" : "false");
  }, [showLogin]);

  // Persist authentication state
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />

      {!isAuthenticated ? (
        <AuthScreens
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          forgotStep={forgotStep}
          setForgotStep={setForgotStep}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <Router>
          <Dashboard
            handleLogout={() => setShowLogoutConfirm(true)}
            isLogoutOpen={showLogoutConfirm}
            setShowLogoutConfirm={setShowLogoutConfirm}
            setIsAuthenticated={setIsAuthenticated}
          />
        </Router>
      )}
    </>
  );
}

// -------------------------
// AUTH SCREENS
// -------------------------
function AuthScreens({ showLogin, setShowLogin, forgotStep, setForgotStep, setIsAuthenticated }) {
  const handleLoginOrSignup = () => {
    setIsAuthenticated(true);
  };

  if (!forgotStep) {
    return showLogin ? (
      <Login
        onLogin={handleLoginOrSignup}
        switchToSignup={() => setShowLogin(false)}
        onForgotPass={() => setForgotStep("email")}
      />
    ) : (
      <Signup onSignup={handleLoginOrSignup} switchToLogin={() => setShowLogin(true)} />
    );
  } else if (forgotStep === "email") {
    return <EnterEmail goBack={() => setForgotStep(null)} goNext={() => setForgotStep("code")} />;
  } else if (forgotStep === "code") {
    return <ForgotPass goBack={() => setForgotStep("email")} goToReset={() => setForgotStep("reset")} />;
  } else {
    return <ResetPassword goBack={() => setForgotStep(null)} />;
  }
}

// -------------------------
// DASHBOARD
// -------------------------
function Dashboard({ handleLogout, isLogoutOpen, setShowLogoutConfirm, setIsAuthenticated }) {
  const navigate = useNavigate();

  const confirmLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutConfirm(false);
    navigate("/"); // Redirect to login/signup
  };

  return (
    <>
      <ScrollToTop />
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-survey" element={<TakeSurvey />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />

      <ConfirmationModal
        isOpen={isLogoutOpen}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
}
