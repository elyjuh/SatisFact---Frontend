import { useState } from "react";
import topDisplay from "../assets/images/top-display.png"; 
import { toast } from "react-toastify";

export default function ResetPassword({ goBack }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateInputs = () => {
    const newErrors = { password: "", confirmPassword: "" };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

      if (!password.trim()) {
        newErrors.password = "Password is required.";
      } else if (password.length < 8 || password.length > 16) {
        newErrors.password = "Password must be 8-16 characters.";
      } else if (!passwordRegex.test(password)) {
        newErrors.password =
          "Password must include uppercase, lowercase, number, and special character.";
      }

      if (!newErrors.password) {
        if (!confirmPassword.trim()) {
          newErrors.confirmPassword = "Please confirm your password.";
        } else if (confirmPassword !== password) {
          newErrors.confirmPassword = "Passwords do not match.";
        }
      } else {

        newErrors.confirmPassword = "";
      }

      setErrors(newErrors);
      return !newErrors.password && !newErrors.confirmPassword;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    toast.success("Password reset successfully!");
    goBack();
  };

  return (
    <section className="reset-password">
      <div className="top-display">
        <img src={topDisplay} alt="top-display" />
      </div>

      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="fg-heading">
          <h2>Reset Password</h2>
          <p>Please enter a new password for your account.</p>
        </div>

        {/* Password Field */}
        <div className="password-field">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
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
          {errors.password && (
            <p className="error-text">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="password-field">
          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <i
                className={`fa-solid ${
                  showConfirm ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="fg-buttons">
          <button className="fg-submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
