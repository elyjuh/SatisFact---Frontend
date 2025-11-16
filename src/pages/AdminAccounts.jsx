import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import "../assets/admin-accounts.css";

export default function AdminAccounts() {
  const [entriesCount, setEntriesCount] = useState(5);
  const [isEntriesOpen, setIsEntriesOpen] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUserEmail, setEditingUserEmail] = useState(null);

  const [users, setUsers] = useState([
    { name: "John Bautista", email: "sp_admin@gmail.com.ph", role: "super-admin", roleName: "Super Admin", department: "IT Department", status: true, lastLogin: "2024-01-15" },
    { name: "Casandra Marie", email: "admin@gmail.com.ph", role: "admin", roleName: "Admin", department: "Operations", status: true, lastLogin: "2024-01-14" },
    { name: "Shiela Cruz", email: "editor1@gmail.com.ph", role: "editor", roleName: "Editor", department: "Analytics", status: true, lastLogin: "2024-01-13" },
    { name: "TinTin Marquez", email: "viewer@gmail.com.ph", role: "viewer", roleName: "Viewer", department: "Records", status: false, lastLogin: "2024-01-10" },
  ]);

  const roleCards = [
    { role: "super-admin", label: "Super Admin", description: "Full system access" },
    { role: "admin", label: "Admin", description: "Manage users and settings" },
    { role: "editor", label: "Editor", description: "Edit content and responses" },
    { role: "viewer", label: "Viewer", description: "View-only access" },
  ];

  const toggleEntries = () => setIsEntriesOpen(!isEntriesOpen);
  const selectEntry = (value) => { setEntriesCount(value); setIsEntriesOpen(false); };

  const [userStatuses, setUserStatuses] = useState(users.reduce((acc, user) => ({ ...acc, [user.email]: user.status }), {}));
  const updateStatus = (email) => setUserStatuses(prev => ({ ...prev, [email]: !prev[email] }));

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
    status: "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#entriesDropdown")) setIsEntriesOpen(false);
      if (!e.target.closest(".custom-dropdown") && !e.target.closest(".timeline-btn")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (field, value) => { setNewUser(prev => ({ ...prev, [field]: value })); setOpenDropdown(null); };
  const handleInputChange = (e) => { const { name, value } = e.target; setNewUser(prev => ({ ...prev, [name]: value })); };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!newUser.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!newUser.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!newUser.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) newErrors.email = "Please enter a valid email address.";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
    if (!newUser.password.trim()) newErrors.password = "Password is required.";
    else if (newUser.password.length < 8 || newUser.password.length > 16) newErrors.password = "Password must be 8-16 characters.";
    else if (!passwordRegex.test(newUser.password)) newErrors.password = "Password must include uppercase, lowercase, number, and special character.";

    if (!newErrors.password) {
      if (!newUser.confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password.";
      else if (newUser.password !== newUser.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    } else newErrors.confirmPassword = "";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const newEntry = {
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: newUser.role,
      roleName: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
      department: newUser.department,
      status: newUser.status === "active",
      lastLogin: "—",
    };

    setUsers(prev => [...prev, newEntry]);
    setUserStatuses(prev => ({ ...prev, [newEntry.email]: newEntry.status }));
    setShowAddUserModal(false);
    setNewUser({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "", department: "", status: "" });
    setErrors({});
  };

  const handleEditClick = (user) => {
    const [firstName, ...rest] = user.name.split(" ");
    const lastName = rest.join(" ");
    setNewUser({
      firstName,
      lastName,
      email: user.email,
      password: "",
      confirmPassword: "",
      role: user.role,
      department: user.department,
      status: user.status ? "active" : "inactive",
    });
    setEditingUserEmail(user.email);
    setShowEditUserModal(true);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(u => {
      if (u.email === editingUserEmail) {
        return {
          ...u,
          name: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
          role: newUser.role,
          roleName: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
          department: newUser.department,
        };
      }
      return u;
    });
    setUsers(updatedUsers);
    setEditingUserEmail(null);
    setShowEditUserModal(false);
  };

  return (
    <>
      <div className="user-management-header">
        <h2>Accounts</h2>
        <div className="user-management-actions">
          <button className="btn primary">Login Activity</button>
          <button
            className="btn primary"
            onClick={() => {
              setNewUser({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "", department: "", status: "" });
              setErrors({});
              setShowAddUserModal(true);
            }}
          >
            Add Users
          </button>
        </div>
      </div>

      <div className="role-cards">
        {roleCards.map((card) => (
          <div key={card.role} className={`role-card ${card.role}`}>
            <span className="role-label">{card.label}</span>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <div className="user-table-wrapper">
        <div className="table-header">
          <div className="timeline-dropdown" id="entriesDropdown">
            <button className={`timeline-btn ${isEntriesOpen ? "active" : ""}`} onClick={toggleEntries}>
              <i className="fa-regular fa-user"></i>
              <span className="timeline-text">{entriesCount}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            {isEntriesOpen && (
              <ul className="timeline-options" style={{ display: "block" }}>
                {[5, 10, 20].map((num) => (
                  <li key={num} onClick={() => selectEntry(num)}>{num}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>ID</th>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, entriesCount).map((user, index) => (
              <tr key={user.email}>
                <td data-label="ID">{index + 1}</td>
                <td data-label="User">
                  <div className="user-email">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </td>
                <td data-label="Role">
                  <span className={`role-label ${user.role}`}>{user.roleName}</span>
                </td>
                <td data-label="Department">{user.department}</td>
                <td data-label="Status">
                  <div className="status-container">
                    <span className={`status-label status ${userStatuses[user.email] ? "active" : "inactive"}`}>
                      {userStatuses[user.email] ? "Active" : "Inactive"}
                    </span>
                    <label className="switch">
                      <input type="checkbox" checked={userStatuses[user.email]} onChange={() => updateStatus(user.email)} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </td>
                <td data-label="Last Login">{user.lastLogin}</td>
                <td data-label="Actions">
                  <div className="action-btns">
                    <button className="action-btn edit" title="Edit details?" onClick={() => handleEditClick(user)}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
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

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      >
        <form className="add-user-form" onSubmit={handleAddUser}>
          <div className="form-fields">
            {/* First & Last Name */}
            <div className="form-group">
              <div className="form-field">
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="Enter first name" value={newUser.firstName} onChange={handleInputChange} className={errors.firstName ? "input-error" : ""} />
                {errors.firstName && <div className="error-text">{errors.firstName}</div>}
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input type="text" name="lastName" placeholder="Enter last name" value={newUser.lastName} onChange={handleInputChange} className={errors.lastName ? "input-error" : ""} />
                {errors.lastName && <div className="error-text">{errors.lastName}</div>}
              </div>
            </div>

            {/* Email & Role */}
            <div className="form-group">
              <div className="form-field">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter email" value={newUser.email} onChange={handleInputChange} className={errors.email ? "input-error" : ""} />
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>

              {/* Role Dropdown */}
              <div className="form-field custom-dropdown" id="roleDropdown">
                <label>Role</label>
                <button type="button" className={`timeline-btn ${openDropdown === "role" ? "active" : ""} ${!newUser.role ? "placeholder" : ""}`} onClick={() => setOpenDropdown(openDropdown === "role" ? null : "role")}>
                  {newUser.role ? newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1) : "Select Role"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openDropdown === "role" && (
                  <ul className="timeline-options" style={{ display: "block" }}>
                    {["admin", "editor", "viewer"].map((opt) => <li key={opt} onClick={() => handleSelect("role", opt)}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</li>)}
                  </ul>
                )}
              </div>
            </div>

            {/* Department & Status */}
            <div className="form-group">
              {/* Department */}
              <div className="form-field custom-dropdown" id="departmentDropdown">
                <label>Department</label>
                <button type="button" className={`timeline-btn ${openDropdown === "department" ? "active" : ""} ${!newUser.department ? "placeholder" : ""}`} onClick={() => setOpenDropdown(openDropdown === "department" ? null : "department")}>
                  {newUser.department || "Select Department"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openDropdown === "department" && (
                  <ul className="timeline-options" style={{ display: "block" }}>
                    {["IT Department", "Operations", "Analytics", "Records"].map((opt) => <li key={opt} onClick={() => handleSelect("department", opt)}>{opt}</li>)}
                  </ul>
                )}
              </div>

              {/* Status */}
              <div className="form-field custom-dropdown" id="statusDropdown">
                <label>Status</label>
                <button type="button" className={`timeline-btn ${openDropdown === "status" ? "active" : ""} ${!newUser.status ? "placeholder" : ""}`} onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}>
                  {newUser.status ? newUser.status.charAt(0).toUpperCase() + newUser.status.slice(1) : "Select Status"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openDropdown === "status" && (
                  <ul className="timeline-options" style={{ display: "block" }}>
                    {["active", "inactive"].map((opt) => <li key={opt} onClick={() => handleSelect("status", opt)}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</li>)}
                  </ul>
                )}
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="form-group">
              <div className="form-field">
                <label>Password</label>
                <div className="password-wrapper">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter password" value={newUser.password} onChange={handleInputChange} className={errors.password ? "input-error" : ""} />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}><i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i></button>
                </div>
                {errors.password && <div className="error-text">{errors.password}</div>}
              </div>

              <div className="form-field">
                <label>Confirm Password</label>
                <div className="password-wrapper">
                  <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm password" value={newUser.confirmPassword} onChange={handleInputChange} className={errors.confirmPassword ? "input-error" : ""} />
                  <button type="button" className="toggle-password" onClick={() => setShowConfirm(!showConfirm)}><i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i></button>
                </div>
                {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
              </div>
            </div>
          </div>

          <div className="submit-btn">
            <button type="submit" className="btn primary">Add User</button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal title="Edit User" isOpen={showEditUserModal} onClose={() => setShowEditUserModal(false)}>
        <form className="add-user-form" onSubmit={handleEditUser}>
          <div className="form-fields">
            {/* First & Last Name */}
            <div className="form-group">
              <div className="form-field">
                <label>First Name</label>
                <input type="text" name="firstName" value={newUser.firstName} onChange={handleInputChange} />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input type="text" name="lastName" value={newUser.lastName} onChange={handleInputChange} />
              </div>
            </div>

            {/* Email & Role */}
            <div className="form-group">
              <div className="form-field">
                <label>Email</label>
                <input type="email" name="email" value={newUser.email} onChange={handleInputChange} />
              </div>
              {/* Role Dropdown */}
              <div className="form-field custom-dropdown" id="roleDropdown">
                <label>Role</label>
                <button type="button" className={`timeline-btn ${openDropdown === "role" ? "active" : ""} ${!newUser.role ? "placeholder" : ""}`} onClick={() => setOpenDropdown(openDropdown === "role" ? null : "role")}>
                  {newUser.role ? newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1) : "Select Role"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openDropdown === "role" && (
                  <ul className="timeline-options" style={{ display: "block" }}>
                    {["admin", "editor", "viewer"].map((opt) => <li key={opt} onClick={() => handleSelect("role", opt)}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</li>)}
                  </ul>
                )}
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="form-group">
              <div className="form-field custom-dropdown" id="departmentDropdown">
                <label>Department</label>
                <button type="button" className={`timeline-btn ${openDropdown === "department" ? "active" : ""} ${!newUser.department ? "placeholder" : ""}`} onClick={() => setOpenDropdown(openDropdown === "department" ? null : "department")}>
                  {newUser.department || "Select Department"}<i className="fa-solid fa-chevron-down"></i>
                </button>
                {openDropdown === "department" && (
                  <ul className="timeline-options" style={{ display: "block" }}>
                    {["IT Department", "Operations", "Analytics", "Records"].map((opt) => <li key={opt} onClick={() => handleSelect("department", opt)}>{opt}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="submit-btn">
            <button type="submit" className="btn primary">Save Changes</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
