import { useState, useEffect, useRef } from "react";
import "../assets/admin-feedback.css"; 
import Modal from "../components/Modal";

export default function AdminFeedback() {
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const entriesRef = useRef(null);

const feedbackList = [
  {
    id: "FB001",
    date: "2025-01-10",
    service: "Payroll Processing",
    userId: "U001",
    userName: "John Doe",
    email: "john@example.com",
    submittedDate: "2025-01-10",
    status: "Completed",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "M", age: 32, clientType: "Citizen", region: "Region A", serviceAvailed: "Payroll Processing" },
    response: "I am satisfied with payroll processing."
  },
  {
    id: "FB002",
    date: "2025-01-11",
    service: "IT Support",
    userId: "U002",
    userName: "Jane Smith",
    email: "jane@example.com",
    submittedDate: "2025-01-11",
    status: "Completed",
    anonymous: true,
    collectDemographics: true,
    demographics: { sex: "F", age: 28, clientType: "Business", region: "Region B", serviceAvailed: "IT Support" },
    response: "IT support is helpful but response time is slow."
  },
  {
    id: "FB003",
    date: "2025-01-12",
    service: "Customer Service",
    userId: "U003",
    userName: "Alice Johnson",
    email: "alice@example.com",
    submittedDate: "2025-01-12",
    status: "Pending",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "F", age: 35, clientType: "Citizen", region: "Region C", serviceAvailed: "Customer Service" },
    response: "Customer service is very responsive."
  },
  {
    id: "FB004",
    date: "2025-01-13",
    service: "HR Consultation",
    userId: "U004",
    userName: "Bob Lee",
    email: "bob@example.com",
    submittedDate: "2025-01-13",
    status: "Completed",
    anonymous: false,
    collectDemographics: false,
    demographics: {},
    response: "HR consultation was professional."
  },
  {
    id: "FB005",
    date: "2025-01-14",
    service: "IT Support",
    userId: "U005",
    userName: "Clara Oswald",
    email: "clara@example.com",
    submittedDate: "2025-01-14",
    status: "Completed",
    anonymous: true,
    collectDemographics: true,
    demographics: { sex: "F", age: 29, clientType: "Business", region: "Region D", serviceAvailed: "IT Support" },
    response: "IT support resolved my issue quickly."
  },
  {
    id: "FB006",
    date: "2025-01-15",
    service: "Payroll Processing",
    userId: "U006",
    userName: "David Kim",
    email: "david@example.com",
    submittedDate: "2025-01-15",
    status: "Pending",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "M", age: 41, clientType: "Citizen", region: "Region A", serviceAvailed: "Payroll Processing" },
    response: "Payroll processing is smooth and fast."
  },
  {
    id: "FB007",
    date: "2025-01-16",
    service: "Customer Service",
    userId: "U007",
    userName: "Eva Green",
    email: "eva@example.com",
    submittedDate: "2025-01-16",
    status: "Completed",
    anonymous: true,
    collectDemographics: true,
    demographics: { sex: "F", age: 30, clientType: "Business", region: "Region B", serviceAvailed: "Customer Service" },
    response: "Customer service could be more detailed."
  },
  {
    id: "FB008",
    date: "2025-01-17",
    service: "HR Consultation",
    userId: "U008",
    userName: "Frank Turner",
    email: "frank@example.com",
    submittedDate: "2025-01-17",
    status: "Completed",
    anonymous: false,
    collectDemographics: false,
    demographics: {},
    response: "Helpful HR guidance."
  },
  {
    id: "FB009",
    date: "2025-01-18",
    service: "Payroll Processing",
    userId: "U009",
    userName: "Grace Hall",
    email: "grace@example.com",
    submittedDate: "2025-01-18",
    status: "Completed",
    anonymous: true,
    collectDemographics: true,
    demographics: { sex: "F", age: 26, clientType: "Citizen", region: "Region C", serviceAvailed: "Payroll Processing" },
    response: "Very satisfied with payroll."
  },
  {
    id: "FB010",
    date: "2025-01-19",
    service: "IT Support",
    userId: "U010",
    userName: "Henry Adams",
    email: "henry@example.com",
    submittedDate: "2025-01-19",
    status: "Pending",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "M", age: 33, clientType: "Business", region: "Region D", serviceAvailed: "IT Support" },
    response: "Waiting for IT follow-up."
  },
  {
    id: "FB011",
    date: "2025-01-20",
    service: "Customer Service",
    userId: "U011",
    userName: "Isabel Wright",
    email: "isabel@example.com",
    submittedDate: "2025-01-20",
    status: "Completed",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "F", age: 38, clientType: "Citizen", region: "Region A", serviceAvailed: "Customer Service" },
    response: "Excellent service."
  },
  {
    id: "FB012",
    date: "2025-01-21",
    service: "HR Consultation",
    userId: "U012",
    userName: "Jack Black",
    email: "jack@example.com",
    submittedDate: "2025-01-21",
    status: "Completed",
    anonymous: true,
    collectDemographics: false,
    demographics: {},
    response: "Good HR advice."
  },
  {
    id: "FB013",
    date: "2025-01-22",
    service: "IT Support",
    userId: "U013",
    userName: "Karen Young",
    email: "karen@example.com",
    submittedDate: "2025-01-22",
    status: "Completed",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "F", age: 27, clientType: "Business", region: "Region B", serviceAvailed: "IT Support" },
    response: "IT support was okay."
  },
  {
    id: "FB014",
    date: "2025-01-23",
    service: "Payroll Processing",
    userId: "U014",
    userName: "Leo Martin",
    email: "leo@example.com",
    submittedDate: "2025-01-23",
    status: "Completed",
    anonymous: false,
    collectDemographics: true,
    demographics: { sex: "M", age: 45, clientType: "Citizen", region: "Region C", serviceAvailed: "Payroll Processing" },
    response: "Payroll processed correctly."
  },
  {
    id: "FB015",
    date: "2025-01-24",
    service: "Customer Service",
    userId: "U015",
    userName: "Mia Clark",
    email: "mia@example.com",
    submittedDate: "2025-01-24",
    status: "Pending",
    anonymous: true,
    collectDemographics: true,
    demographics: { sex: "F", age: 31, clientType: "Business", region: "Region D", serviceAvailed: "Customer Service" },
    response: "Customer service is improving."
  }
];


  const toggleEntries = () => setIsEntriesOpen(!isEntriesOpen);
  const selectEntries = (value, e) => {
    e.stopPropagation();
    setEntriesCount(value);
    setIsEntriesOpen(false);
  };

  const viewResponse = (feedback) => {
    setSelectedResponse(feedback);
    setOpenResponseModal(true);
  };

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
      {/* Header */}
      <div className="feedback-header">
        <h2>Feedback</h2>

        <div className="user-management-actions">         
          <button className="btn primary" onClick={() => {
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <path fill="currentColor" d="M160 208a12 12 0 0 1-12 12h-28a12 12 0 0 1-12-12v-56a12 12 0 0 1 24 0v44h16a12 12 0 0 1 12 12m-69-65.78A12 12 0 0 0 74.24 145L64 159.34L53.77 145a12 12 0 1 0-19.53 14l15 21l-15 21a12 12 0 1 0 19.53 14L64 200.62L74.24 215a12 12 0 0 0 19.53-14l-15-21l15-21A12 12 0 0 0 91 142.22m122.53 32.05c-5.12-3.45-11.32-5.24-16.79-6.82a80 80 0 0 1-7.92-2.59c2.45-1.18 9.71-1.3 16.07.33A12 12 0 0 0 211 142a69 69 0 0 0-12-1.86c-9.93-.66-18 1.08-24.1 5.17a24.45 24.45 0 0 0-10.69 17.76c-1.1 8.74 2.49 16.27 10.11 21.19c4.78 3.09 10.36 4.7 15.75 6.26c3 .89 7.94 2.3 9.88 3.53a2.5 2.5 0 0 1-.21.71c-1.37 1.55-9.58 1.79-16.39-.06a12 12 0 1 0-6.46 23.11A63.8 63.8 0 0 0 193.1 220c6.46 0 13.73-1.17 19.73-5.15a24.73 24.73 0 0 0 10.95-18c1.22-9.32-2.45-17.32-10.27-22.58ZM36 108V40a20 20 0 0 1 20-20h96a12 12 0 0 1 8.49 3.51l56 56A12 12 0 0 1 220 88v20a12 12 0 1 1-24 0v-4h-48a12 12 0 0 1-12-12V44H60v64a12 12 0 1 1-24 0m124-28h23l-23-23Z"/>
            </svg>
            Export as XLS</button>
        </div>
      </div>

      {/* Entries dropdown & table wrapper */}
      <div className="feedback-table-wrapper">
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
              <th>Service</th>
              <th>User ID</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {feedbackList.slice(0, entriesCount).map(fb => (
              <tr key={fb.id}>
                <td data-label="ID">{fb.id}</td>
                <td data-label="Date">{fb.date}</td>
                <td data-label="Service">{fb.service}</td>
                <td data-label="User ID">{fb.userId}</td>
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
        <button className="page-btn"><i className="fa-solid fa-chevron-left"></i></button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn"><i className="fa-solid fa-chevron-right"></i></button>
      </div>

      {/* Response Modal */}
      <Modal isOpen={openResponseModal} title="User Response" onClose={() => setOpenResponseModal(false)}>
        {selectedResponse && (
          <div>
            <h4>Export as</h4>
            <div className="export-buttons">
              {/* PDF */}
              <button className="export-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path fill="currentColor" d="M200 164v8h12a12 12 0 0 1 0 24h-12v12a12 12 0 0 1-24 0v-56a12 12 0 0 1 12-12h32a12 12 0 0 1 0 24Zm-108 8a32 32 0 0 1-32 32h-4v4a12 12 0 0 1-24 0v-56a12 12 0 0 1 12-12h16a32 32 0 0 1 32 32m-24 0a8 8 0 0 0-8-8h-4v16h4a8 8 0 0 0 8-8m100 8a40 40 0 0 1-40 40h-16a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h16a40 40 0 0 1 40 40m-24 0a16 16 0 0 0-16-16h-4v32h4a16 16 0 0 0 16-16M36 108V40a20 20 0 0 1 20-20h96a12 12 0 0 1 8.49 3.52l56 56A12 12 0 0 1 220 88v20a12 12 0 0 1-24 0v-4h-48a12 12 0 0 1-12-12V44H60v64a12 12 0 1 1-24 0m124-51v23h23Z" />
                </svg>
                PDF
              </button>

              {/* CSV */}
              <button className="export-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path fill="currentColor" d="M48 180c0 8.67 5.49 16 12 16a10.27 10.27 0 0 0 7.33-3.43a12 12 0 1 1 17.34 16.6A34 34 0 0 1 60 220c-19.85 0-36-18-36-40s16.15-40 36-40a34 34 0 0 1 24.67 10.83a12 12 0 1 1-17.34 16.6A10.27 10.27 0 0 0 60 164c-6.51 0-12 7.31-12 16m97.51-5.71c-5.13-3.45-11.33-5.24-16.8-6.82a80 80 0 0 1-7.91-2.59c2.45-1.18 9.71-1.3 16.07.33A12 12 0 0 0 143 142a69 69 0 0 0-12-1.86c-9.93-.66-18 1.08-24.1 5.17a24.45 24.45 0 0 0-10.69 17.76c-1.1 8.74 2.48 16.27 10.11 21.19c4.78 3.09 10.36 4.7 15.75 6.26c3 .89 7.94 2.3 9.88 3.53a2 2 0 0 1-.22.71c-1.36 1.55-9.57 1.79-16.39-.06a12 12 0 0 0-6.45 23.11a63.7 63.7 0 0 0 16.2 2.19c6.47 0 13.74-1.17 19.74-5.15a24.73 24.73 0 0 0 10.95-18c1.22-9.32-2.46-17.32-10.27-22.58ZM216 140.68a12 12 0 0 0-15.3 7.32l-8.7 24.3l-8.7-24.3a12 12 0 1 0-22.6 8l20 56a12 12 0 0 0 22.6 0l20-56a12 12 0 0 0-7.3-15.32M36 108V40a20 20 0 0 1 20-20h96a12 12 0 0 1 8.49 3.51l56 56A12 12 0 0 1 220 88v20a12 12 0 1 1-24 0v-4h-48a12 12 0 0 1-12-12V44H60v64a12 12 0 1 1-24 0m124-28h23l-23-23Z" />
                </svg>
                CSV
              </button>

              {/* Excel */}
              <button className="export-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path fill="currentColor" d="M160 208a12 12 0 0 1-12 12h-28a12 12 0 0 1-12-12v-56a12 12 0 0 1 24 0v44h16a12 12 0 0 1 12 12m-69-65.78A12 12 0 0 0 74.24 145L64 159.34L53.77 145a12 12 0 1 0-19.53 14l15 21l-15 21a12 12 0 1 0 19.53 14L64 200.62L74.24 215a12 12 0 0 0 19.53-14l-15-21l15-21A12 12 0 0 0 91 142.22m122.53 32.05c-5.12-3.45-11.32-5.24-16.79-6.82a80 80 0 0 1-7.92-2.59c2.45-1.18 9.71-1.3 16.07.33A12 12 0 0 0 211 142a69 69 0 0 0-12-1.86c-9.93-.66-18 1.08-24.1 5.17a24.45 24.45 0 0 0-10.69 17.76c-1.1 8.74 2.49 16.27 10.11 21.19c4.78 3.09 10.36 4.7 15.75 6.26c3 .89 7.94 2.3 9.88 3.53a2.5 2.5 0 0 1-.21.71c-1.37 1.55-9.58 1.79-16.39-.06a12 12 0 1 0-6.46 23.11A63.8 63.8 0 0 0 193.1 220c6.46 0 13.73-1.17 19.73-5.15a24.73 24.73 0 0 0 10.95-18c1.22-9.32-2.45-17.32-10.27-22.58ZM36 108V40a20 20 0 0 1 20-20h96a12 12 0 0 1 8.49 3.51l56 56A12 12 0 0 1 220 88v20a12 12 0 1 1-24 0v-4h-48a12 12 0 0 1-12-12V44H60v64a12 12 0 1 1-24 0m124-28h23l-23-23Z"/>
                </svg>
                XLS
              </button>
            </div>




            {/* User Details */}
            <div className="response-details">
              <p><strong>Name:</strong> {selectedResponse.anonymous ? "Anonymous" : selectedResponse.userName}</p>
              <p><strong>Email:</strong> {selectedResponse.email}</p>
              <p><strong>Submitted Date:</strong> {selectedResponse.submittedDate}</p>
              <p><strong>Status:</strong> {selectedResponse.status}</p>

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
