import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import logo from "../assets/images/satisfacts-logo-2.png";

export default function Navbar({ onLogout, progressStep, totalSteps }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const surveyRoutes = ["/take-survey/registration", "/take-survey/survey-form", "/take-survey/completion"];
  const isSurveyMode = surveyRoutes.includes(location.pathname);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="navbar-wrapper">
      <nav className="top-nav">
        <div
          className="nav-logo"
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Logo" />
        </div>

        <div
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${open ? "active" : ""}`}>
          <ul>
            {!isSurveyMode && (
              <>
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/take-survey">Take Survey</NavLink></li>
                <li><NavLink to="/submissions">Submissions</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
              </>
            )}
            <li>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {isSurveyMode && progressStep && (
        <ProgressBar step={progressStep} totalSteps={totalSteps} />
      )}
    </div>
  );
}
