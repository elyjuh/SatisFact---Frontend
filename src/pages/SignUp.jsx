import { useState } from "react";
import { toast } from "react-toastify";
import satisfactsLogo from "../assets/images/satisfacts-logo-2.png";
import loginLogo from "../assets/images/login-logo.png";
import valenzuelaLogo from "../assets/images/valenzuela-logo.png";
import artaLogo from "../assets/images/arta-logo.png";

import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import TermsModal from "../components/TermsModal";

export default function Signup({ switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passFocused, setPassFocused] = useState(false);
  const [passHovered, setPassHovered] = useState(false);

  const [confirmFocused, setConfirmFocused] = useState(false);
  const [confirmHovered, setConfirmHovered] = useState(false);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const getButtonStyle = (focused, hovered) => ({
    opacity: focused || hovered ? 1 : 0.4,
    cursor: focused || hovered ? "pointer" : "default",
    transition: "opacity 0.2s",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id.replace("signup-", "")]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.fname.trim()) newErrors.fname = "First name is required.";
    if (!form.lname.trim()) newErrors.lname = "Last name is required.";

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8 || form.password.length > 16) {
      newErrors.password = "Password must be 8-16 characters.";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character.";
    }

    if (!newErrors.password) {
      if (!form.confirm.trim()) {
        newErrors.confirm = "Please confirm your password.";
      } else if (form.password !== form.confirm) {
        newErrors.confirm = "Passwords do not match.";
      }
    } else {
      newErrors.confirm = "";
    }

    if (!newErrors.password && !newErrors.confirm) {
      if (!form.agree) newErrors.agree = "You must agree to the terms.";
    } else {
      newErrors.agree = "";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    toast.success("Account created successfully!");
    switchToLogin();
  };

  return (
    <>
      <section className="signup">
        <div className="signup-heading">
          <div className="welcome-title">
            <img src={satisfactsLogo} alt="satisfacts-logo" />
            <h2>Join Us Today!</h2>
            <p>Fill in your details to get started.</p>
          </div>

          <div className="signup-links">
            <p>Already have an account? Click here</p>
            <button className="signup-link-login" onClick={switchToLogin}>
              Log In
            </button>
            <div className="link-seals">
              <img src={valenzuelaLogo} alt="valenzuela-logo" />
              <img src={artaLogo} alt="arta-logo" />
            </div>
          </div>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-logo">
            <img src={loginLogo} alt="login-logo" />
          </div>

          <div className="signup-credentials">
            <h2>Create Account</h2>

            {/* Name group */}
            <div className="signup-input-group name">
              <div className="first-name">
                <label htmlFor="signup-fname">First Name</label>
                <input
                  type="text"
                  id="signup-fname"
                  placeholder="Hally"
                  value={form.fname}
                  onChange={handleChange}
                  className={errors.fname ? "input-error" : ""}
                  required
                />
                {errors.fname && <p className="error-text">{errors.fname}</p>}
              </div>

              <div className="last-name">
                <label htmlFor="signup-lname">Last Name</label>
                <input
                  type="text"
                  id="signup-lname"
                  placeholder="Imbawa"
                  value={form.lname}
                  onChange={handleChange}
                  className={errors.lname ? "input-error" : ""}
                  required
                />
                {errors.lname && <p className="error-text">{errors.lname}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="signup-input-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                placeholder="halimbawa@gmail.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                required
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="signup-input-group password-field">
              <label htmlFor="signup-pass">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  className={errors.password ? "input-error" : ""}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={() => setPassHovered(true)}
                  onMouseLeave={() => setPassHovered(false)}
                  style={getButtonStyle(passFocused, passHovered)}
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

            {/* Confirm Password */}
            <div className="signup-input-group password-field">
              <label htmlFor="signup-confirm">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="signup-confirm"
                  placeholder="Confirm your password"
                  value={form.confirm}
                  onChange={handleChange}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                  className={errors.confirm ? "input-error" : ""}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}
                  onMouseEnter={() => setConfirmHovered(true)}
                  onMouseLeave={() => setConfirmHovered(false)}
                  style={getButtonStyle(confirmFocused, confirmHovered)}
                >
                  <i
                    className={`fa-solid ${
                      showConfirm ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.confirm && <p className="error-text">{errors.confirm}</p>}
            </div>

              {/* Acknowledge Terms */}
            <div className="signup-input-group acknowledge">
              <input
                type="checkbox"
                id="signup-agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <label htmlFor="signup-agree">
                I agree to the 
                  <span className="modal-links">
                    <button
                      type="button"
                      className="privacy-policy-modal"
                      onClick={() => setShowPrivacyModal(true)}
                    >
                    Privacy Policy
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="tac-modal"
                      onClick={() => setShowTermsModal(true)}
                      >
                    Terms & Conditions
                    </button>
                  .
                </span>
              </label>
              
              {errors.agree && <p className="error-text">{errors.agree}</p>}
            </div>

            {/* Submit button */}
            <button type="submit" className="signup-submit-btn">
              Sign Up
            </button>
          </div>

          {/* Footer */}
          <div className="signup-footer">
            <p>Already have an account? Click here</p>
            <button className="signup-link-login" onClick={switchToLogin}>
              Log In
            </button>
            <div className="link-seals">
              <img src={valenzuelaLogo} alt="valenzuela-logo" />
              <img src={artaLogo} alt="arta-logo" />
            </div>
          </div>
        </form>
      </section>

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </>
  );
}
