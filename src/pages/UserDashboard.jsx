import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

import Home from "./Home";
import TakeSurvey from "./TakeSurvey";
import Submissions from "./Submissions";
import Contact from "./Contact";

import Registration from "./Registration";
import SurveyForm from "./SurveyForm";
import Completion from "./Completion";

export default function UserDashboard({ handleLogout, isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // Determine survey progress step
  const surveyRoutes = ["/take-survey/registration", "/take-survey/survey-form", "/take-survey/completion"];
  const stepMap = {
    "/take-survey/registration": 1,
    "/take-survey/survey-form": 2,
    "/take-survey/completion": 3,
  };
  const isSurveyMode = surveyRoutes.includes(location.pathname);
  const progressStep = stepMap[location.pathname] || null;

  return (
    <>
      <ScrollToTop />
      <Navbar
        onLogout={handleLogout}
        progressStep={progressStep}
        totalSteps={3}
      />

      <Routes>
        {/* Dashboard pages */}
        <Route path="/" element={<Home />} />
        <Route path="/take-survey" element={<TakeSurvey />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/take-survey/registration" element={<Registration />} />
        <Route path="/take-survey/survey-form" element={<SurveyForm />} />
        <Route path="/take-survey/completion" element={<Completion />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
