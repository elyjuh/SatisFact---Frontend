import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/survey-process.css";

export default function Registration() {
  const [clientType, setClientType] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [region, setRegion] = useState("");
  const [service, setService] = useState("");
  const [showError, setShowError] = useState(false);

  const clientTypes = ["Citizen", "Business", "Government"];
  const sexes = ["Male", "Female"];

  const navigate = useNavigate();

  function validateForm() {
    const valid =
      clientType &&
      sex &&
      age.trim() !== "" &&
      date.trim() !== "" &&
      region.trim() !== "" &&
      service.trim() !== "";

    setShowError(!valid);
    return valid;
  }

  function goToSurveyForm() {
    if (validateForm()) {
      navigate("/take-survey/survey-form");
    }
  }

  return (
    <div className="registration-container">
      <div className="page-header survey-header">
        <div className="header-texts">
          <div className="form-title">Registration Information</div>
          <p className="form-desc2">Fill out the form with your information to continue.</p>
        </div>
        <button className="btn-back" onClick={() => navigate("/take-survey")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div className="reg-container">
        <div className="header-box">
          <div className="icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#A056CD">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-4.5 0-8 1.7-8 4v2h16v-2c0-2.3-3.5-4-8-4z"></path>
            </svg>
          </div>
          <div className="header-text">
            <div className="header-title">Personal Information</div>
            <div className="header-sub">Kindly fill in the required information below.</div>
          </div>
        </div>

        <div className="inner">
          <div className="form-rows">
            {/* CLIENT TYPE */}
            <div className="required-border">
              <div className="section-label">
                Client Type {!clientType && <span className="dynamic-req-star">*</span>}
              </div>
              <div className="client-type-row">
                {clientTypes.map((type) => (
                  <div
                    key={type}
                    className={`type-btn ${clientType === type ? "active" : ""} ${
                      !clientType && showError ? "input-error" : ""
                    }`}
                    onClick={() => setClientType(type)}
                    tabIndex="0"
                  >
                    {type === "Citizen" && <i className="fa-solid fa-user type-icon"></i>}
                    {type === "Business" && <i className="fa-solid fa-building type-icon"></i>}
                    {type === "Government" && <i className="fa-solid fa-landmark type-icon"></i>}
                    <span>{type}</span>
                  </div>
                ))}
              </div>
              {!clientType && showError && <div className="error-text">Client Type is required</div>}
            </div>

            {/* AGE + DATE */}
            <div className="input-row-large">
              <div className="required-border field-group">
                <label className="field-label">
                  Age {!age && <span className="dynamic-req-star">*</span>}
                </label>
                <input
                  type="number"
                  className={`input-box-large ${!age && showError ? "input-error" : ""}`}
                  id="age"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {!age && showError && <div className="error-text">Age is required</div>}
              </div>

              <div className="required-border field-group">
                <label className="field-label">
                  Date {!date && <span className="dynamic-req-star">*</span>}
                </label>
                <input
                  type="date"
                  className={`input-box-large ${!date && showError ? "input-error" : ""}`}
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {!date && showError && <div className="error-text">Date is required</div>}
              </div>
            </div>

            {/* SEX */}
            <div className="required-border">
              <div className="section-label">
                Sex {!sex && <span className="dynamic-req-star">*</span>}
              </div>
              <div className="sex-row">
                {sexes.map((s) => (
                  <div
                    key={s}
                    className={`sex-btn ${sex === s ? "active" : ""} ${
                      !sex && showError ? "input-error" : ""
                    }`}
                    onClick={() => setSex(s)}
                    tabIndex="0"
                  >
                    {s === "Male" && <i className="fa-solid fa-mars sex-icon"></i>}
                    {s === "Female" && <i className="fa-solid fa-venus sex-icon"></i>}
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              {!sex && showError && <div className="error-text">Sex is required</div>}
            </div>

            {/* REGION */}
            <div className="required-border region-row">
              <div className="section-label">
                Region of Residence {!region && <span className="dynamic-req-star">*</span>}
              </div>
              <select
                className={`select-box-large ${!region && showError ? "input-error" : ""}`}
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Select region</option>
                <option value="Region1">Region 1</option>
                <option value="Region2">Region 2</option>
              </select>
              {!region && showError && <div className="error-text">Region is required</div>}
            </div>

            {/* SERVICE */}
            <div className="required-border service-row">
              <div className="section-label">
                Service Availed {!service && <span className="dynamic-req-star">*</span>}
              </div>
              <select
                className={`select-box-large ${!service && showError ? "input-error" : ""}`}
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Select service</option>
                <option value="Service1">Service 1</option>
                <option value="Service2">Service 2</option>
              </select>
              {!service && showError && <div className="error-text">Service is required</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="survey-btn-area">
        <button className="btn-next-out" onClick={goToSurveyForm}>
          Proceed
        </button>
      </div>
    </div>
  );
}
