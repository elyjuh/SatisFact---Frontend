import React from "react";

export default function Modal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose} 
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Blue Header Banner */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
