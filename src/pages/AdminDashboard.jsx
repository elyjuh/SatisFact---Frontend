import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminOverview from "../pages/AdminOverview";
import AdminAccounts from "../pages/AdminAccounts";
import AdminContact from "../pages/AdminContact";
import AdminSurvey from "../pages/AdminSurvey";
import AdminServices from "../pages/AdminServices";
import AdminFeedback from "../pages/AdminFeedback";
import AdminSurveys from "../pages/AdminSurveys";

export default function AdminDashboard({ handleLogout }) {
  return (
    <div className="admin-dashboard">
      <AdminSidebar handleLogout={handleLogout} />
      <main>
            <Routes>
              <Route path="/admin/overview" element={<AdminOverview />} />
              <Route path="/admin/accounts" element={<AdminAccounts />} />
              <Route path="/admin/support" element={<AdminContact />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/survey" element={<AdminSurvey />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
              <Route path="/admin/surveys" element={<AdminSurveys />} />

              <Route path="*" element={<Navigate to="/admin/overview" />} />
            </Routes>
      </main>
    </div>
  );
}
