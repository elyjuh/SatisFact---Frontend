import { useState, useEffect, useRef } from "react";
import "../assets/admin-feedback.css"; 
import Modal from "../components/Modal";

export default function AdminFeedback() {
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [filterTitle, setFilterTitle] = useState("All");
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesRef = useRef(null);
  const titleRef = useRef(null);

  const feedbackList = [
    { id: "FB001", date: "2025-01-10", title: "Payroll Feedback", service: "Payroll Processing", userId: "U001", userName: "John Doe", email: "john@example.com", submittedDate: "2025-01-10", status: "Completed", anonymous: false, collectDemographics: true, demographics: { sex: "M", age: 32, clientType: "Citizen", region: "Region A", serviceAvailed: "Payroll Processing" }, response: "I am satisfied with payroll processing.", rating: 5 },
    { id: "FB002", date: "2025-01-11", title: "IT Follow-up", service: "IT Support", userId: "U002", userName: "Jane Smith", email: "jane@example.com", submittedDate: "2025-01-11", status: "Completed", anonymous: true, collectDemographics: true, demographics: { sex: "F", age: 28, clientType: "Business", region: "Region B", serviceAvailed: "IT Support" }, response: "IT support is helpful but response time is slow.", rating: 3 },
    { id: "FB003", date: "2025-01-12", title: "Payroll Feedback", service: "Customer Service", userId: "U003", userName: "Alice Johnson", email: "alice@example.com", submittedDate: "2025-01-12", status: "Pending", anonymous: false, collectDemographics: true, demographics: { sex: "F", age: 35, clientType: "Citizen", region: "Region C", serviceAvailed: "Customer Service" }, response: "Customer service is very responsive.", rating: 4 },
    { id: "FB004", date: "2025-01-13", title: "HR Consultation", service: "HR Consultation", userId: "U004", userName: "Bob Lee", email: "bob@example.com", submittedDate: "2025-01-13", status: "Completed", anonymous: false, collectDemographics: false, demographics: {}, response: "HR consultation was professional.", rating: 5 },
    { id: "FB005", date: "2025-01-14", title: "IT Follow-up", service: "IT Support", userId: "U005", userName: "Clara Oswald", email: "clara@example.com", submittedDate: "2025-01-14", status: "Completed", anonymous: true, collectDemographics: true, demographics: { sex: "F", age: 29, clientType: "Business", region: "Region D", serviceAvailed: "IT Support" }, response: "IT support resolved my issue quickly.", rating: 4 },
    { id: "FB006", date: "2025-01-15", title: "Payroll Issue", service: "Payroll Processing", userId: "U006", userName: "David Kim", email: "david@example.com", submittedDate: "2025-01-15", status: "Pending", anonymous: false, collectDemographics: true, demographics: { sex: "M", age: 41, clientType: "Citizen", region: "Region A", serviceAvailed: "Payroll Processing" }, response: "Payroll processing is smooth and fast.", rating: 5 },
    { id: "FB007", date: "2025-01-16", title: "Customer Feedback", service: "Customer Service", userId: "U007", userName: "Eva Green", email: "eva@example.com", submittedDate: "2025-01-16", status: "Completed", anonymous: true, collectDemographics: true, demographics: { sex: "F", age: 30, clientType: "Business", region: "Region B", serviceAvailed: "Customer Service" }, response: "Customer service could be more detailed.", rating: 3 },
    { id: "FB008", date: "2025-01-17", title: "HR Guidance", service: "HR Consultation", userId: "U008", userName: "Frank Turner", email: "frank@example.com", submittedDate: "2025-01-17", status: "Completed", anonymous: false, collectDemographics: false, demographics: {}, response: "Helpful HR guidance.", rating: 4 },
    { id: "FB009", date: "2025-01-18", title: "Payroll Feedback", service: "Payroll Processing", userId: "U009", userName: "Grace Hall", email: "grace@example.com", submittedDate: "2025-01-18", status: "Completed", anonymous: true, collectDemographics: true, demographics: { sex: "F", age: 26, clientType: "Citizen", region: "Region C", serviceAvailed: "Payroll Processing" }, response: "Very satisfied with payroll.", rating: 5 },
    { id: "FB010", date: "2025-01-19", title: "IT Follow-up", service: "IT Support", userId: "U010", userName: "Henry Adams", email: "henry@example.com", submittedDate: "2025-01-19", status: "Pending", anonymous: false, collectDemographics: true, demographics: { sex: "M", age: 33, clientType: "Business", region: "Region D", serviceAvailed: "IT Support" }, response: "Waiting for IT follow-up.", rating: 2 },
    { id: "FB011", date: "2025-01-20", title: "Customer Compliment", service: "Customer Service", userId: "U011", userName: "Isabel Wright", email: "isabel@example.com", submittedDate: "2025-01-20", status: "Completed", anonymous: false, collectDemographics: true, demographics: { sex: "F", age: 38, clientType: "Citizen", region: "Region A", serviceAvailed: "Customer Service" }, response: "Excellent service.", rating: 5 },
    { id: "FB012", date: "2025-01-21", title: "HR Advice", service: "HR Consultation", userId: "U012", userName: "Jack Black", email: "jack@example.com", submittedDate: "2025-01-21", status: "Completed", anonymous: true, collectDemographics: false, demographics: {}, response: "Good HR advice.", rating: 4 },
    { id: "FB013", date: "2025-01-22", title: "IT Satisfaction", service: "IT Support", userId: "U013", userName: "Karen Young", email: "karen@example.com", submittedDate: "2025-01-22", status: "Completed", anonymous: false, collectDemographics: true, demographics: { sex: "F", age: 27, clientType: "Business", region: "Region B", serviceAvailed: "IT Support" }, response: "IT support was okay.", rating: 3 },
    { id: "FB014", date: "2025-01-23", title: "Payroll Feedback", service: "Payroll Processing", userId: "U014", userName: "Leo Martin", email: "leo@example.com", submittedDate: "2025-01-23", status: "Completed", anonymous: false, collectDemographics: true, demographics: { sex: "M", age: 45, clientType: "Citizen", region: "Region C", serviceAvailed: "Payroll Processing" }, response: "Payroll processed correctly.", rating: 5 },
    { id: "FB015", date: "2025-01-24", title: "Customer Service Update", service: "Customer Service", userId: "U015", userName: "Mia Clark", email: "mia@example.com", submittedDate: "2025-01-24", status: "Pending", anonymous: true, collectDemographics: true, demographics: { sex: "F", age: 31, clientType: "Business", region: "Region D", serviceAvailed: "Customer Service" }, response: "Customer service is improving.", rating: 4 }
  ];

  const titleTypes = ["All", ...new Set(feedbackList.map(fb => fb.title))];
  const filteredFeedback = feedbackList.filter(fb => filterTitle === "All" ? true : fb.title === filterTitle);

  // Calculate average rating
  const averageRating = filteredFeedback.length > 0
    ? (filteredFeedback.reduce((sum, fb) => sum + fb.rating, 0) / filteredFeedback.length).toFixed(1)
    : 0;

  const toggleEntries = () => setIsEntriesOpen(!isEntriesOpen);
  const selectEntries = (value, e) => {
    e.stopPropagation();
    setEntriesCount(value);
    setIsEntriesOpen(false);
    setCurrentPage(1);
  };

  const viewResponse = (feedback) => {
    setSelectedResponse(feedback);
    setOpenResponseModal(true);
  };

  const totalPages = Math.ceil(filteredFeedback.length / entriesCount);
  const currentData = filteredFeedback.slice((currentPage - 1) * entriesCount, currentPage * entriesCount);
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (entriesRef.current && !entriesRef.current.contains(e.target)) setIsEntriesOpen(false);
      if (titleRef.current && !titleRef.current.contains(e.target)) setIsTitleOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="feedback-header">
        <h2>Feedback</h2>
        <div className="user-management-actions">
          <button className="btn primary">Export as XLS</button>
        </div>
      </div>

      {/* Cards */}
      <div className="deployment-details">
        <div className="total-responses">
          <h4>{filteredFeedback.length}</h4>
          <h4>Total Responses</h4>
        </div>
        <div className="average-ratings">
          <h4>{averageRating}</h4>
          <h4>Average Rating</h4>
        </div>
        <div className="expiry-date">
          <h4>{filterTitle}</h4>
          <h4>Survey</h4>
        </div>
      </div>

      {/* Entries & Title dropdown */}
      <div className="feedback-table-wrapper">
        <div className="table-header">
          <div className="timeline-dropdown title-filter" ref={titleRef}>
            <button
              type="button"
              className={`timeline-btn ${isTitleOpen ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setIsTitleOpen(!isTitleOpen); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" fill-rule="evenodd" d="M.75 2a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 1.5 0V3.5h2.75v9h-.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-.5v-9H8.5v.75a.75.75 0 0 0 1.5 0v-1.5A.75.75 0 0 0 9.25 2zM8 7.75A.75.75 0 0 1 8.75 7h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 8 7.75m0 3.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75" clip-rule="evenodd" />
              </svg>
              
              {filterTitle}
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            {isTitleOpen && (
              <ul className="timeline-options active">
                {titleTypes.map(title => (
                  <li key={title} onClick={(e) => { e.stopPropagation(); setFilterTitle(title); setIsTitleOpen(false); setCurrentPage(1); }}>
                    {title}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
                  <li key={num} onClick={(e) => selectEntries(num, e)}>{num}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Table */}
        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Title</th>
              <th>User ID</th>
              <th>Rating</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(fb => (
              <tr key={fb.id}>
                <td data-label="ID">{fb.id}</td>
                <td data-label="Date">{fb.date}</td>
                <td data-label="Title">{fb.title}</td>
                <td data-label="User ID">{fb.userId}</td>
                <td data-label="Rating">{fb.rating}</td>
                <td data-label="Response">
                  <button className="view-comment-btn" onClick={() => viewResponse(fb)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn" onClick={() => goToPage(currentPage - 1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={`page-btn ${currentPage === i + 1 ? "active" : ""}`} onClick={() => goToPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button className="page-btn" onClick={() => goToPage(currentPage + 1)}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Response Modal */}
      <Modal isOpen={openResponseModal} title="User Response" onClose={() => setOpenResponseModal(false)}>
        {selectedResponse && (
          <div>
            <h4>Export as</h4>
            <div className="export-buttons">
              <button className="export-btn">PDF</button>
              <button className="export-btn">CSV</button>
              <button className="export-btn">XLS</button>
            </div>

            <div className="response-details">
              <p><strong>Name:</strong> {selectedResponse.anonymous ? "Anonymous" : selectedResponse.userName}</p>
              <p><strong>Email:</strong> {selectedResponse.email}</p>
              <p><strong>Submitted Date:</strong> {selectedResponse.submittedDate}</p>
              <p><strong>Status:</strong> {selectedResponse.status}</p>
              <p><strong>Rating:</strong> {selectedResponse.rating}</p>

              {selectedResponse.collectDemographics && (
                <div className="demographics">
                  <p><strong>Sex:</strong> {selectedResponse.anonymous ? "Anonymous" : selectedResponse.demographics.sex}</p>
                  <p><strong>Age:</strong> {selectedResponse.anonymous ? "Anonymous" : selectedResponse.demographics.age}</p>
                  <p><strong>Client Type:</strong> {selectedResponse.demographics.clientType}</p>
                  <p><strong>Region of Residence:</strong> {selectedResponse.demographics.region}</p>
                  <p><strong>Service Availed:</strong> {selectedResponse.demographics.serviceAvailed}</p>
                </div>
              )}

              <p><strong>Response:</strong> {selectedResponse.response}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
