import React from "react";
import Modal from "./Modal";

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-container" onClick={e => e.stopPropagation()}>
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="logout-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes, I want to leave.</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}