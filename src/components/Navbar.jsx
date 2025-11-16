import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/satisfacts-logo-2.png";

export default function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="top-nav">
      <div className="nav-logo" onClick={scrollToTop} style={{ cursor: "pointer" }}>
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
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/take-survey">Take Survey</NavLink></li>
          <li><NavLink to="/submissions">Submissions</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
