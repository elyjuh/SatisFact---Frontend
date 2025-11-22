import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/survey-process.css"; 

export default function Completion() {

    const navigate = useNavigate();

    const handleHomeBtn = (e) => {
        navigate("/");
    };

  return (
    <div className="completion">
      <div className="completion-container">
        <div className="completion-header">
          <div className="completion-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>

          <h2 className="completion-title">Thank you!</h2>
          <div className="completion-success">Survey Completed Successfully</div>
          <div className="completion-description">
            <p className="completion-desc">
              The City Government of Valenzuela values your input. Your feedback
              will help us improve our services and better serve the community.
            </p>
          </div>
        </div>

        <div className="completion-det">
          <h3 className="details-title">Survey Details</h3>

          <div className="completion-details">
            <div className="detail-row">
              <span className="detail-label">Reference Number</span>
              <span className="detail-value">CSM-78328082</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Submitted</span>
              <span className="detail-value">10/01/25</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className="detail-value">Completed</span>
            </div>

            <div className="completion-buttons">
              <button className="btn-generate completion-btn-pdf">
                View My Answers
              </button>
              <button className="btn-generate completion-btn-excel">
                Generate PDF
              </button>
            </div>
          </div>
        </div>

        <div className="completion-next">
          <strong>What happens next?</strong>

          <div className="completion-description next-desc">
            <p className="completion-desc">
              Your feedback will be reviewed by our quality improvement team and
              may be used to enhance our services. If you provided an email
              address, you may be contacted for clarification.
            </p>
          </div>
        </div>
      </div>

      <button className="btn-next-out completion-home" onClick={handleHomeBtn}>Return to Home Page</button>
    </div>
  );
}