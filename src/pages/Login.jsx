import { useState } from "react";
import { toast } from "react-toastify";
import loginLogo from "../assets/images/login-logo.png";
import valenzuelaLogo from "../assets/images/valenzuela-logo.png";
import artaLogo from "../assets/images/arta-logo.png";
import satisfactsLogo from "../assets/images/satisfacts-logo-2.png";

import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import TermsModal from "../components/TermsModal";

export default function Login({ onLogin, switchToSignup, onForgotPass }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id.replace("login-", "")]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

  onLogin(form.email);
  };


  return (
    <section className="login">
      <div className="login-heading">
        <div className="welcome-title">
          <img src={satisfactsLogo} alt="satisfacts-logo" />
          <h2>Welcome Back!</h2>
          <p>Log in with your credentials to access the system.</p>
        </div>

        <div className="login-links">
          <p>Don’t have an account? Click here</p>
          <button className="login-link-signup" onClick={switchToSignup}>
            Sign Up
          </button>
          <div className="link-seals">
            <img src={valenzuelaLogo} alt="valenzuela-logo" />
            <img src={artaLogo} alt="arta-logo" />
          </div>
        </div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src={loginLogo} alt="login-logo" />
        </div>

        <div className="login-credentials">
          <h2>Login</h2>

          <div className="login-input-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="login-input-group password-field">
            <label htmlFor="login-password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button
            type="button"
            className="login-forgot-pass"
            onClick={onForgotPass}
          >
            Forgot Password?
          </button>

          <button type="submit" className="login-submit-btn">
            Login
          </button>

          <div className="user-reference">
            <button
              type="button"
              className="privacy-policy-modal"
              onClick={() => setShowPrivacyModal(true)}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="tac-modal"
              onClick={() => setShowTermsModal(true)}
            >
              Terms & Conditions
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>Don’t have an account? Click here</p>
          <button className="login-link-signup" onClick={switchToSignup}>
            Sign Up
          </button>
          <div className="link-seals">
            <img src={valenzuelaLogo} alt="valenzuela-logo" />
            <img src={artaLogo} alt="arta-logo" />
          </div>
        </div>
      </form>

      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </section>
  );
}
