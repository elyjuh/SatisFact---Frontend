import React from "react";
import "../assets/survey-process.css";

export default function ProgressBar({ step = 1, totalSteps = 3 }) {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="progress-bar-container">
        <div className="progress-bar-wrapper">
            <div className="progress-bar">
            <div
                className="progress-bar-fill"
                style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
            </div>
        </div>
        <div className="progress-bar-text">
            Step {step} of {totalSteps}
        </div>
    </div>

  );
}
