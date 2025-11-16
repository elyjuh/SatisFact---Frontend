import { useState, useEffect, useRef } from "react";
import "../assets/admin.css";
import "../assets/admin-contact.css";

export default function AdminContact() {
  // --- State ---
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);

  const [dateFilter, setDateFilter] = useState("All Dates");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  // --- Refs ---
  const entriesRef = useRef(null);
  const dateFilterRef = useRef(null);
  const statusRefs = useRef({});

  // --- Sample Contacts ---
  const contacts = [
    {
      id: "REF001",
      name: "John Smith",
      date: "2025-11-01 14:35:22",
      status: "Unreviewed",
      email: "john.smith@gmail.com",
      subject: "Request for Access",
      message: "Hi, I need access to the new dashboard.",
    },
    {
      id: "REF002",
      name: "Jane Doe",
      date: "2025-11-03 09:12:50",
      status: "Reviewed",
      email: "jane.doe@gmail.com",
      subject: "Feedback on system performance",
      message: "The system seems slow during peak hours.",
    },
    {
      id: "REF003",
      name: "Carlos Reyes",
      date: "2025-11-06 16:42:10",
      status: "Flagged",
      email: "carlos.reyes@gmail.com",
      subject: "Account issue",
      message: "Unable to log into my account since last week.",
    },
  ];

  const [statuses, setStatuses] = useState(
    contacts.reduce((acc, c) => ({ ...acc, [c.id]: c.status }), {})
  );

  // --- Handlers ---
  const toggleEntries = (e) => {
    e.stopPropagation();
    setIsEntriesOpen((prev) => !prev);
  };
  const selectEntry = (num) => {
    setEntriesCount(num);
    setIsEntriesOpen(false);
  };

  const toggleDateFilter = (e) => {
    e.stopPropagation();
    setIsDateFilterOpen((prev) => !prev);
  };
  const selectDateFilter = (filter) => {
    setDateFilter(filter);
    setIsDateFilterOpen(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));
    setOpenStatusDropdown(null);
  };

  const toggleRowExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Click Outside Handler ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (entriesRef.current && !entriesRef.current.contains(e.target)) {
        setIsEntriesOpen(false);
      }
      if (dateFilterRef.current && !dateFilterRef.current.contains(e.target)) {
        setIsDateFilterOpen(false);
      }

      contacts.forEach((c) => {
        if (
          statusRefs.current[c.id] &&
          !statusRefs.current[c.id].contains(e.target)
        ) {
          if (openStatusDropdown === c.id) setOpenStatusDropdown(null);
        }
      });
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contacts, openStatusDropdown]);

  // --- Filter Contacts by Date ---
  const filteredContacts = contacts.filter((contact) => {
    const now = new Date();
    const contactDate = new Date(contact.date);

    switch (dateFilter) {
      case "Last 7 Days":
        return (now - contactDate) / (1000 * 60 * 60 * 24) <= 7;
      case "Last 30 Days":
        return (now - contactDate) / (1000 * 60 * 60 * 24) <= 30;
      case "This Month":
        return (
          contactDate.getMonth() === now.getMonth() &&
          contactDate.getFullYear() === now.getFullYear()
        );
      default:
        return true;
    }
  });

  return (
    <div className="admin-page-content">
      <div className="user-management-header">
        <h2>Support</h2>
      </div>

      <div className="user-table-wrapper">
        {/* Table Header with Entries & Date Dropdowns */}
        <div className="table-header">
          {/* Entries */}
          <div className="timeline-dropdown dropdown-area" ref={entriesRef}>
            <button
              className={`timeline-btn ${isEntriesOpen ? "active" : ""}`}
              onClick={toggleEntries}
            >
              <i className="fa-regular fa-envelope"></i>
              <span className="timeline-text">{entriesCount}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>

            {isEntriesOpen && (
              <ul className="timeline-options" style={{ display: "block" }}>
                {[5, 10, 20].map((num) => (
                  <li key={num} onClick={() => selectEntry(num)}>
                    {num}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date Filter */}
          <div className="timeline-dropdown dropdown-area" ref={dateFilterRef}>
            <button
              className={`timeline-btn ${isDateFilterOpen ? "active" : ""}`}
              onClick={toggleDateFilter}
            >
              <i className="fa-regular fa-calendar"></i>
              <span className="timeline-text">{dateFilter}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>

            {isDateFilterOpen && (
              <ul className="timeline-options" style={{ display: "block" }}>
                {["All Dates", "Last 7 Days", "Last 30 Days", "This Month"].map(
                  (filter) => (
                    <li key={filter} onClick={() => selectDateFilter(filter)}>
                      {filter}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="table-scroll">
          <table className="user-table compact-contact-table">
            <thead>
              <tr>
                <th>Ref. ID</th>
                <th>User</th>
                <th className="date-col">Date</th>
                <th>Status</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.slice(0, entriesCount).map((contact) => (
                <tr key={contact.id}>
                  <td data-label="Ref. ID">{contact.id}</td>
                  <td data-label="User">
                    <div className="user-email">
                      <strong>{contact.name}</strong>
                      <small className="text-ellipsis">{contact.email}</small>
                    </div>
                  </td>
                  <td data-label="Date" className="date-col">
                    {contact.date}
                  </td>
                  <td data-label="Status">
                    <div
                      className="form-field custom-dropdown dropdown-area"
                      style={{ position: "relative" }}
                      ref={(el) => (statusRefs.current[contact.id] = el)}
                    >
                      <button
                        type="button"
                        className={`status-dropdown-btn status-${statuses[
                          contact.id
                        ]?.toLowerCase()}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatusDropdown(
                            openStatusDropdown === contact.id
                              ? null
                              : contact.id
                          );
                        }}
                      >
                        {statuses[contact.id]}
                        <i className="fa-solid fa-chevron-down"></i>
                      </button>

                      {openStatusDropdown === contact.id && (
                        <ul
                          className="timeline-options"
                          style={{
                            display: "block",
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 999,
                            background: "#fff",
                            border: "1px solid #ccc",
                            minWidth: "100px",
                          }}
                        >
                          {["Unreviewed", "Reviewed", "Flagged"].map((opt) => (
                            <li
                              key={opt}
                              onClick={() =>
                                handleStatusChange(contact.id, opt)
                              }
                            >
                              {opt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </td>
                  <td
                    data-label="Subject"
                    className={`text-ellipsis ${
                      expandedRows[contact.id] ? "expanded" : ""
                    }`}
                    onClick={() => toggleRowExpand(contact.id)}
                  >
                    {contact.subject}
                  </td>
                  <td
                    data-label="Message"
                    className={`text-ellipsis ${
                      expandedRows[contact.id] ? "expanded" : ""
                    }`}
                    onClick={() => toggleRowExpand(contact.id)}
                  >
                    {contact.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn">
          <i className="fa-solid fa-chevron-left fa-lg"></i>
        </button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">
          <i className="fa-solid fa-chevron-right fa-lg"></i>
        </button>
      </div>
    </div>
  );
}
