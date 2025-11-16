import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/satisfacts-logo-2.png";
import "../assets/admin.css";   

export default function AdminSidebar({ handleLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.getElementById("toggle-btn");
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
    setIsCollapsed(!isCollapsed);
    closeAllSubMenus();
  };

  const toggleSubMenu = () => {
    const sidebar = document.getElementById("sidebar");
    if (!isManageOpen && sidebar.classList.contains("close")) {
      sidebar.classList.remove("close");
      document.getElementById("toggle-btn").classList.remove("rotate");
      setIsCollapsed(false);
    }
    setIsManageOpen(!isManageOpen);
  };

  const closeAllSubMenus = () => {
    setIsManageOpen(false);
  };

  const toggleMobile = () => {
    const hamburger = document.getElementById("hamburger-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    
    hamburger.classList.toggle("active");
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    const hamburger = document.getElementById("hamburger-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    
    hamburger.classList.remove("active");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    setIsMobileOpen(false);
  };


  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.getElementById("sidebar");
      if (window.innerWidth <= 1200) {
        sidebar.classList.remove("close");
        closeAllSubMenus();
      }
      closeMobileMenu();
    };

    const handleDocClick = (e) => {
      const sidebarEl = document.getElementById('sidebar');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      if (!sidebarEl) return;
      if (!sidebarEl.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeAllSubMenus();
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener('click', handleDocClick);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('click', handleDocClick);
    };
  }, []);

  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <nav id="sidebar" className={`${isCollapsed ? "close" : ""} ${isMobileOpen ? "show" : ""}`}>
        <ul>
          {/* Logo + Toggle */}
          <li className="sidebar-header">
            <img src={logo} alt="SatisFact Logo" className="sidebar-logo logo" />
            <button id="toggle-btn" onClick={toggleSidebar} className={`${isCollapsed ? "rotate" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
                <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
              </svg>
            </button>
          </li>

          {/* Overview */}
          <li className={location.pathname === "/admin/overview" ? "active" : ""}>
            <NavLink to="/admin/overview" onClick={closeMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF">
                <path d="M560-600q-17 0-28.5-11.5T520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560ZM160-440q-17 0-28.5-11.5T120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160Zm400 320q-17 0-28.5-11.5T520-160v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560Zm-400 0q-17 0-28.5-11.5T120-160v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160Z"/>
              </svg>
              <span>Overview</span>
            </NavLink>
          </li>

          {/* Report */}
          <li className={location.pathname === "/admin/report" ? "active" : ""}>
            <NavLink to="/admin/report" onClick={closeMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF">
                <path d="M680-160q-17 0-28.5-11.5T640-200v-200q0-17 11.5-28.5T680-440h80q17 0 28.5 11.5T800-400v200q0 17-11.5 28.5T760-160h-80Zm-240 0q-17 0-28.5-11.5T400-200v-560q0-17 11.5-28.5T440-800h80q17 0 28.5 11.5T560-760v560q0 17-11.5 28.5T520-160h-80Zm-240 0q-17 0-28.5-11.5T160-200v-360q0-17 11.5-28.5T200-600h80q17 0 28.5 11.5T320-560v360q0 17-11.5 28.5T280-160h-80Z"/>
              </svg>
              <span>Report</span>
            </NavLink>
          </li>

          {/* Manage Dropdown */}
          <li>
            <button onClick={toggleSubMenu} className={`dropdown-btn ${isManageOpen ? "rotate" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
                <path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z"/>
              </svg>
              <span>Manage</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
              </svg>
            </button>
            <ul className={`sub-menu ${isManageOpen ? "show" : ""}`}>
              <div>
                <li className={location.pathname === "/admin/accounts" ? "active" : ""}><NavLink to="/admin/accounts" onClick={closeMobileMenu}>Accounts</NavLink></li>
                <li className={location.pathname === "/admin/services" ? "active" : ""}><NavLink to="/admin/services" onClick={closeMobileMenu}>Services</NavLink></li>
                <li className={location.pathname === "/admin/support" ? "active" : ""}><NavLink to="/admin/support" onClick={closeMobileMenu}>Support</NavLink></li>
                <li className={location.pathname === "/admin/survey" ? "active" : ""}><NavLink to="/admin/survey" onClick={closeMobileMenu}>Survey</NavLink></li>
              </div>
            </ul>
          </li>

          {/* Audit Log */}
          <li className={location.pathname === "/admin/audit-log" ? "active" : ""}>
            <NavLink to="/admin/audit-log" onClick={closeMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF">
                <path d="M480-120q-126 0-223-76.5T131-392q-4-15 6-27.5t27-14.5q16-2 29 6t18 24q24 90 99 147t170 57q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h70q17 0 28.5 11.5T360-600q0 17-11.5 28.5T320-560H160q-17 0-28.5-11.5T120-600v-160q0-17 11.5-28.5T160-800q17 0 28.5 11.5T200-760v54q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm40-376 100 100q11 11 11 28t-11 28q-11 11-28 11t-28-11L452-452q-6-6-9-13.5t-3-15.5v-159q0-17 11.5-28.5T480-680q17 0 28.5 11.5T520-640v144Z"/>
              </svg>
              <span>Audit Log</span>
            </NavLink>
          </li>

          {/* Logout */}
          <li className="logout">
            <button onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z"/>
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Hamburger for mobile */}
      <button id="hamburger-btn" onClick={toggleMobile}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      <div id="overlay" onClick={closeMobileMenu}></div>
    </>
  );
}
