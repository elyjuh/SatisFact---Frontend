import React from "react";

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure?", 
  confirmText = "Yes", 
  cancelText = "Cancel" 
}) {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-container" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="logout-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>{confirmText}</button>
          <button className="cancel-btn" onClick={onClose}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
}
