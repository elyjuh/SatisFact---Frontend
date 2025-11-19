import { useState, useEffect, useRef } from "react";

export default function AdminSurveys() {
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);

  const [surveys, setSurveys] = useState([
    {
      id: "SV001",
      title: "Employee IT Satisfaction",
      description: "Evaluate the efficiency of IT services",
      createdBy: "Admin",
      departmentName: "IT Department",
      serviceName: "Support Services",
      isAnonymous: true,
      collectDemographics: false,
      expiryDate: "2025-12-31",
      maxResponses: 100,
      status: true,
      surveyCode: "A1B2C3",
      qrCodePath: "/qr/sv001.png",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-05",
    },
    {
      id: "SV002",
      title: "Payroll Feedback",
      description: "Rate the payroll processing experience",
      createdBy: "Supervisor",
      departmentName: "HR Department",
      serviceName: "Payroll Services",
      isAnonymous: false,
      collectDemographics: true,
      expiryDate: "2025-11-10",
      maxResponses: 200,
      status: false,
      surveyCode: "X9T7R2",
      qrCodePath: "/qr/sv002.png",
      createdAt: "2025-01-10",
      updatedAt: "2025-01-11",
    }
  ]);

  const [surveyStatuses, setSurveyStatuses] = useState(
    surveys.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
  );

  const entriesRef = useRef(null);

  const toggleEntries = () => setIsEntriesOpen(!isEntriesOpen);
  const selectEntry = (value) => { setEntriesCount(value); setIsEntriesOpen(false); };

  const updateStatus = (id) =>
    setSurveyStatuses(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (entriesRef.current && !entriesRef.current.contains(e.target)) {
        setIsEntriesOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="user-management-header">
        <h2>Surveys</h2>
      </div>

      <div className="user-table-wrapper">
        <div className="table-header">
          <div className="timeline-dropdown entries-dropdown" ref={entriesRef}>
            <button
              type="button"
              className={`timeline-btn ${isEntriesOpen ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); toggleEntries(); }}
            >
              <i className="fa-solid fa-arrow-down-short-wide"></i>
              {entriesCount}
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            {isEntriesOpen && (
              <ul className="timeline-options active">
                {[5, 10, 20].map(num => (
                  <li key={num} onClick={() => selectEntry(num)}>{num}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Survey</th>
              <th>Department</th>
              <th>Service</th>
              <th>Status</th>
              <th>Max Responses</th>
              <th>Expiry Date</th>
              <th>Code</th>
            </tr>
          </thead>

          <tbody>
            {surveys.slice(0, entriesCount).map(survey => (
              <tr key={survey.id}>
                <td data-label="ID">{survey.id}</td>

                <td data-label="Survey">
                  <div className="user-email">
                    <strong>{survey.title}</strong>
                    <small>{survey.description}</small>
                  </div>
                </td>

                <td data-label="Department">{survey.departmentName}</td>
                <td data-label="Service">{survey.serviceName}</td>

                <td data-label="Status">
                  <div className="status-container">
                    <span className={`status-label status ${surveyStatuses[survey.id] ? "active" : "inactive"}`}>
                      {surveyStatuses[survey.id] ? "Active" : "Inactive"}
                    </span>
                    <label className="switch">
                      <input type="checkbox"
                        checked={surveyStatuses[survey.id]}
                        onChange={() => updateStatus(survey.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </td>

                <td data-label="Max Responses">{survey.maxResponses}</td>
                <td data-label="Expiry Date">{survey.expiryDate}</td>
                <td data-label="Code">{survey.surveyCode}</td>
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
