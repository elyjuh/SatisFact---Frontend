import { useState, useEffect, useRef } from "react";
import "../assets/admin-services.css";

export default function AuditLog() {
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);

  const [logs, setLogs] = useState([
    { id: "AL001", activity: "Login", user: "USR001", timestamp: "2025-01-10 09:12 AM" },
    { id: "AL002", activity: "Updated Record", user: "USR003", timestamp: "2025-01-10 10:45 AM" },
    { id: "AL003", activity: "Deleted Entry", user: "USR002", timestamp: "2025-01-11 01:22 PM" },
    { id: "AL004", activity: "Password Change", user: "USR005", timestamp: "2025-01-12 04:55 PM" },
  ]);

  const entriesRef = useRef(null);

  const toggleEntries = () => setIsEntriesOpen(!isEntriesOpen);
  const selectEntry = (value) => {
    setEntriesCount(value);
    setIsEntriesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (entriesRef.current && !entriesRef.current.contains(e.target)) setIsEntriesOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="user-management-header">
        <h2>Audit Log</h2>
      </div>

      <div className="user-table-wrapper">
        <div className="table-header">
          <div className="timeline-dropdown entries-dropdown" ref={entriesRef}>
            <button
              type="button"
              className={`timeline-btn ${isEntriesOpen ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleEntries();
              }}
            >
              <i className="fa-solid fa-arrow-down-short-wide"></i>
              {entriesCount}
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            {isEntriesOpen && (
              <ul className="timeline-options active">
                {[5, 10, 20].map((num) => (
                  <li key={num} onClick={() => selectEntry(num)}>
                    {num}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Activity</th>
              <th>User</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, entriesCount).map((log) => (
              <tr key={log.id}>
                <td data-label="Activity ID">{log.id}</td>
                <td data-label="Activity">{log.activity}</td>
                <td data-label="User">{log.user}</td>
                <td data-label="Timestamp">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="page-btn"><i className="fa-solid fa-chevron-left fa-lg"></i></button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn"><i className="fa-solid fa-chevron-right fa-lg"></i></button>
      </div>
    </>
  );
}