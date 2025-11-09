import { useState } from "react";
import topDisplay from "../assets/images/top-display.png";
import { toast } from "react-toastify";

export default function ForgotPass({ goBack, goToReset }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter the verification code sent to your email.");
      return;
    }
    toast.success("Code verified successfully!");
    goToReset();
  };

  return (
    <section className="forgot-pass">
      <div className="top-display">
        <img src={topDisplay} alt="top-display" />
      </div>

      <form className="forgot-pass-form" onSubmit={handleSubmit}>
        <div className="fg-heading">
          <h2>Enter Verification Code</h2>
          <p>Check your email for a 6-digit verification code.</p>
        </div>

        <div className="fg-input">
          <label htmlFor="verify-code">Verification Code</label>
          <div className="code-wrapper">
            <input
              type="number"
              id="verify-code"
              placeholder="Enter code"
              maxLength="6"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCode(value);
              }}
              required
              autoComplete="off"
            />
            <i className="fa-solid fa-key code-icon"></i>
          </div>
        </div>

        <div className="fg-buttons">
          <button className="fg-submit-btn" type="submit">
            Verify
          </button>
        </div>
      </form>
    </section>
  );
}
