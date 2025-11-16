import { useState } from "react";
import topDisplay from "../assets/images/top-display.png"; 
import { toast } from "react-toastify";

export default function EnterEmail({ goBack, goNext }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
        toast.error("Please enter your email address.");
        return;
    }

    toast.success(`A reset link has been sent to "${email}"`); 
    goNext();
  };

  return (
    <section className="enter-email">
      <div className="top-display">
        <img src={topDisplay} alt="top-display" />
      </div>

      <form className="enter-email-form" onSubmit={handleSubmit}>
        <div className="ee-heading">
          <h2>Forgot Password?</h2>
          <p>
            Enter your registered email address to receive a password reset link.
          </p>
        </div>

        <div className="email-field">
          <label htmlFor="enter-email-text">Email</label>
          <div className="email-wrapper">
            <input
              type="email"
              id="enter-email-text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <i className="fa-solid fa-envelope email-icon"></i>
          </div>
        </div>

        <div className="ee-buttons ee-buttons-row">
          <button className="ee-submit-btn" type="submit">
            Send Reset Link
          </button>
          <button type="button" className="ee-back-btn" onClick={goBack}>
            Back
          </button>
        </div>
      </form>
    </section>
  );
}
