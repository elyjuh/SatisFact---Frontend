import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import "../assets/admin-services.css";

export default function AdminServices() {
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [services, setServices] = useState([
    { id: "SS001", name: "Payroll Processing", department: "Operations", category: "Finance", status: true, responses: 25, rating: 4.5 },
    { id: "SS002", name: "IT Support", department: "IT Department", category: "Technical", status: true, responses: 15, rating: 4.2 },
    { id: "SS003", name: "Analytics Reporting", department: "Analytics", category: "Data", status: false, responses: 30, rating: 4.7 },
    { id: "SS004", name: "Records Management", department: "Records", category: "Documentation", status: true, responses: 12, rating: 4.0 },
  ]);

  const [serviceStatuses, setServiceStatuses] = useState(
    services.reduce((acc, s) => ({ ...acc, [s.id]: s.status }), {})
  );

  const [newService, setNewService] = useState({
    name: "",
    department: "",
    category: "",
    status: "",
    responses: "",
    rating: "",
  });

  // Dropdown states
  const [openAddDropdown, setOpenAddDropdown] = useState(null);
  const [openEditDropdown, setOpenEditDropdown] = useState(null);

  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const entriesRef = useRef(null);
  const addDepartmentRef = useRef(null);
  const editDepartmentRef = useRef(null);

  const toggleEntries = () => setIsEntriesOpen(!isEntriesOpen);
  const selectEntry = (value) => { setEntriesCount(value); setIsEntriesOpen(false); };
  const handleInputChange = (e) => { const { name, value } = e.target; setNewService(prev => ({ ...prev, [name]: value })); };
  const updateStatus = (id) => setServiceStatuses(prev => ({ ...prev, [id]: !prev[id] }));

  const handleSelect = (field, value, modalType) => {
    setNewService(prev => ({ ...prev, [field]: value }));
    if (modalType === "add") setOpenAddDropdown(null);
    else setOpenEditDropdown(null);
  };

  const generateServiceId = () => {
    if (services.length === 0) return "SS001";
    const lastId = services[services.length - 1].id;
    const num = parseInt(lastId.replace("SS", "")) + 1;
    return `SS${num.toString().padStart(3, "0")}`;
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const newEntry = {
      id: generateServiceId(),
      name: newService.name,
      department: newService.department,
      category: newService.category,
      status: true,
      responses: newService.responses || 0,
      rating: newService.rating || 0,
    };
    setServices(prev => [...prev, newEntry]);
    setServiceStatuses(prev => ({ ...prev, [newEntry.id]: newEntry.status }));
    setShowAddServiceModal(false);
    setNewService({ name: "", department: "", category: "", status: "", responses: "", rating: "" });
  };

  const handleEditClick = (service) => {
    setNewService({
      id: service.id,
      name: service.name,
      department: service.department,
      category: service.category,
      status: service.status ? "active" : "inactive",
      responses: service.responses,
      rating: service.rating,
    });
    setEditingServiceId(service.id);
    setShowEditServiceModal(true);
  };

  const handleEditService = (e) => {
    e.preventDefault();
    const updatedServices = services.map(s => s.id === editingServiceId ? {
      ...s,
      name: newService.name,
      department: newService.department,
      category: newService.category,
      responses: newService.responses,
      rating: newService.rating
    } : s);
    setServices(updatedServices);
    setEditingServiceId(null);
    setShowEditServiceModal(false);
  };

  // Trigger confirmation modal instead of direct delete
  const handleDeleteClick = (id) => {
    setServiceToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(prev => prev.filter(s => s.id !== serviceToDelete));
      setServiceStatuses(prev => {
        const copy = { ...prev };
        delete copy[serviceToDelete];
        return copy;
      });
      setServiceToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (entriesRef.current && !entriesRef.current.contains(e.target)) setIsEntriesOpen(false);
      if (addDepartmentRef.current && !addDepartmentRef.current.contains(e.target)) setOpenAddDropdown(null);
      if (editDepartmentRef.current && !editDepartmentRef.current.contains(e.target)) setOpenEditDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="user-management-header">
        <h2>Services</h2>
        <div className="user-management-actions">
          <button className="btn primary" onClick={() => {
            setNewService({ name: "", department: "", category: "", status: "", responses: "", rating: "" });
            setShowAddServiceModal(true);
          }}>Add Service</button>
        </div>
      </div>

      <div className="user-table-wrapper">
        <div className="table-header">
          <div className="timeline-dropdown entries-dropdown" ref={entriesRef}>
            <button
              type="button"
              className={`timeline-btn ${isEntriesOpen ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); toggleEntries(); }}
            >
              <i className="fa-solid fa-arrow-down-short-wide" style={{ marginLeft: "6px" }}></i>
              {entriesCount}
              <i className="fa-solid fa-chevron-down" style={{ marginLeft: "6px" }}></i>
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
              <th>Service</th>
              <th>Category</th>
              <th>Status</th>
              <th>Responses</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.slice(0, entriesCount).map(service => (
              <tr key={service.id}>
                <td data-label="ID">{service.id}</td>
                <td data-label="Service">
                  <div className="user-email">
                    <strong>{service.name}</strong>
                    <small>{service.department}</small>
                  </div>
                </td>
                <td data-label="Category">{service.category}</td>
                <td data-label="Status">
                  <div className="status-container">
                    <span className={`status-label status ${serviceStatuses[service.id] ? "active" : "inactive"}`}>
                      {serviceStatuses[service.id] ? "Active" : "Inactive"}
                    </span>
                    <label className="switch">
                      <input type="checkbox" checked={serviceStatuses[service.id]} onChange={() => updateStatus(service.id)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </td>
                <td data-label="Responses">{service.responses}</td>
                <td data-label="Rating">{service.rating}</td>
                <td data-label="Actions">
                  <div className="action-btns">
                    <button className="action-btn edit" onClick={() => handleEditClick(service)}><i className="fa-solid fa-pen"></i></button>
                    <button className="action-btn delete" onClick={() => handleDeleteClick(service.id)}><i className="fa-solid fa-trash"></i></button>
                  </div>
                </td>
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

      {/* Add Service Modal */}
      <Modal title="Add Service" isOpen={showAddServiceModal} onClose={() => setShowAddServiceModal(false)}>
        <form className="add-user-form add-service-form" onSubmit={handleAddService}>
          <div className="form-fields">
            <div className="form-group">
              <div className="form-field">
                <label>Service Name</label>
                <input type="text" name="name" value={newService.name} onChange={handleInputChange} required />
              </div>

              <div className="form-field custom-dropdown department-dropdown" ref={addDepartmentRef}>
                <label>Department</label>
                <button
                  type="button"
                  className={`timeline-btn ${openAddDropdown === "department" ? "active" : ""} ${!newService.department ? "placeholder" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setOpenAddDropdown(openAddDropdown === "department" ? null : "department"); }}
                >
                  {newService.department || "Select Department"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openAddDropdown === "department" && (
                  <ul className="timeline-options active">
                    {["IT Department", "Operations", "Analytics", "Records"].map(opt => (
                      <li key={opt} onClick={() => handleSelect("department", opt, "add")}>{opt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="form-field">
                <label>Category</label>
                <input type="text" name="category" value={newService.category} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="submit-btn">
            <button type="submit" className="btn primary">Add Service</button>
          </div>
        </form>
      </Modal>

      {/* Edit Service Modal */}
      <Modal title="Edit Service" isOpen={showEditServiceModal} onClose={() => setShowEditServiceModal(false)}>
        <form className="add-user-form edit-service-form" onSubmit={handleEditService}>
          <div className="form-fields">
            <div className="form-group">
              <div className="form-field">
                <label>Service Name</label>
                <input type="text" name="name" value={newService.name} onChange={handleInputChange} required />
              </div>

              <div className="form-field custom-dropdown department-dropdown" ref={editDepartmentRef}>
                <label>Department</label>
                <button
                  type="button"
                  className={`timeline-btn ${openEditDropdown === "department" ? "active" : ""} ${!newService.department ? "placeholder" : ""}`}
                  onClick={(e) => { e.stopPropagation(); setOpenEditDropdown(openEditDropdown === "department" ? null : "department"); }}
                >
                  {newService.department || "Select Department"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openEditDropdown === "department" && (
                  <ul className="timeline-options active">
                    {["IT Department", "Operations", "Analytics", "Records"].map(opt => (
                      <li key={opt} onClick={() => handleSelect("department", opt, "edit")}>{opt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="form-field">
                <label>Category</label>
                <input type="text" name="category" value={newService.category} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="submit-btn">
            <button type="submit" className="btn primary">Save Changes</button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        confirmText="Yes, I want to delete"
        cancelText="Cancel"
      />
    </>
  );
}
