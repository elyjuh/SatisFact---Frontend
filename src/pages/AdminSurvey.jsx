import "../assets/admin.css";
import "../assets/admin-survey.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useRef, useState } from "react";


export default function AdminSurvey() {

  const [mainTab, setMainTab] = useState("deployed-survey");

  const [subTab, setSubTab] = useState("basic");

  const [dropdownOpen, setDropdownOpen] = useState({
    dateDropdown: false,
    statusDropdown: false,
    serviceDropdown: false,
    departmentDropdown: false,
    deploymentStatusDropdown: false,
    questionTypeDropdown: false,
  });

  // Individual dropdown open states
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isDeploymentStatusDropdownOpen, setIsDeploymentStatusDropdownOpen] = useState(false);
  const [isQuestionTypeDropdownOpen, setIsQuestionTypeDropdownOpen] = useState(false);

  // Refs for click-outside
  const dateDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const departmentDropdownRef = useRef(null);
  const deploymentStatusDropdownRef = useRef(null);
  const questionTypeDropdownRef = useRef(null);

  // Dropdown values
  const [dropdownValue, setDropdownValue] = useState({
    dateDropdown: "7 days",
    statusDropdown: "All Status",
    serviceDropdown: "Select Service",
    departmentDropdown: "Select Department",
    deploymentStatusDropdown: "Draft",
    questionTypeDropdown: "Multiple Choice",
  });

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) setIsDateDropdownOpen(false);
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) setIsStatusDropdownOpen(false);
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) setIsServiceDropdownOpen(false);
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) setIsDepartmentDropdownOpen(false);
      if (deploymentStatusDropdownRef.current && !deploymentStatusDropdownRef.current.contains(event.target)) setIsDeploymentStatusDropdownOpen(false);
      if (questionTypeDropdownRef.current && !questionTypeDropdownRef.current.contains(event.target)) setIsQuestionTypeDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Option pick handlers
  const pickDropdownOption = (dropdownId, text) => {
    setDropdownValue((prev) => ({ ...prev, [dropdownId]: text }));
    switch (dropdownId) {
      case "dateDropdown":
        setIsDateDropdownOpen(false);
        break;
      case "statusDropdown":
        setIsStatusDropdownOpen(false);
        break;
      case "serviceDropdown":
        setIsServiceDropdownOpen(false);
        break;
      case "departmentDropdown":
        setIsDepartmentDropdownOpen(false);
        break;
      case "deploymentStatusDropdown":
        setIsDeploymentStatusDropdownOpen(false);
        break;
      case "questionTypeDropdown":
        setIsQuestionTypeDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  // Toggle switches
  const [anonymousToggle, setAnonymousToggle] = useState(false);
  const [demographicsToggle, setDemographicsToggle] = useState(false);

  // Form fields (basic settings)
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [maxResponses, setMaxResponses] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});

  // QR ref & code
  const qrContainerRef = useRef(null);
  const [qrVisible, setQrVisible] = useState(false);
  const SURVEY_LINK = "https://example.com/survey-link"; // same as original

  // Copy code value
  const SURVEY_CODE = "19DAMM21S";

  // Utility: toggle dropdown
  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
  };

  // Click outside handler to close dropdowns
  useEffect(() => {
    const onDocClick = (e) => {
      const el = e.target;
      const closestDropdown = el.closest && el.closest(".timeline-dropdown");
      setDropdownOpen((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (!closestDropdown || closestDropdown.id !== k) next[k] = false;
        });
        return next;
      });
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);


  // Main tab switching
  const handleMainTabClick = (target) => {
    setMainTab(target);
    if (target === "survey-creation") {
      setSubTab("basic");
    }
  };

  // Subtab switching
  const handleSubTabClick = (target) => {
    setSubTab(target);
  };

  // Toggle handlers (log to console similar to original)
  useEffect(() => {
    console.log(`anonymous-toggle is now ${anonymousToggle ? "ON" : "OFF"}`);
  }, [anonymousToggle]);

  useEffect(() => {
    console.log(`demographics-toggle is now ${demographicsToggle ? "ON" : "OFF"}`);
  }, [demographicsToggle]);

  // Form validation & submit (basic-sett-form)
  const validateBasicForm = () => {
    const newErrors = {};
    if (!surveyTitle.trim()) newErrors.surveyTitle = "Survey Title is required";
    if (!surveyDescription.trim())
      newErrors.surveyDescription = "Survey Description is required";
    if (!expiryDate) newErrors.expiryDate = "Expiry Date is required";
    if (!maxResponses || Number(maxResponses) < 1)
      newErrors.maxResponses = "Maximum Responses must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBasicFormSubmit = (e) => {
    e.preventDefault();
    if (validateBasicForm()) {
      // proceed - original just prevented submit if errors; here we can console
      console.log("Basic settings valid — proceed");
      // If you want to actually do something, add logic here
    } else {
      console.log("Validation errors", errors);
    }
  };

  // Load QR code library dynamically (mimic original <script> include)
  useEffect(() => {
    // If QR library already loaded, skip
    if (typeof window.QRCode !== "undefined") return;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // keep script — user might reuse; do not remove on unmount to avoid breaking other parts
    };
  }, []);

  const handleGenerateQR = () => {
    setQrVisible(true);

    setTimeout(() => {
      if (typeof window.QRCode === "undefined") {
        console.warn("QRCode library not loaded yet");
        return;
      }

      const container = qrContainerRef.current;
      if (!container) return;
      container.innerHTML = "";

      new window.QRCode(container, {
        text: SURVEY_LINK,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: window.QRCode?.CorrectLevel?.H ?? undefined,
      });
    }, 50);
  };

  // Copy code button
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(SURVEY_CODE);
      console.log("Copied code:", SURVEY_CODE);
      
    } catch (err) {
      console.warn("Clipboard copy failed", err);
    }
  };

  

  // Simple helper to render the same HTML (survey area only)
  return (
      <div className="survey">
        <div className="user-management-header">
          <h2>Survey</h2>
        </div>

        <div className="survey-main-tabs">
          <button
            className={`main-btn ${mainTab === "deployed-survey" ? "active" : ""}`}
            data-tab="deployed-survey"
            onClick={() => handleMainTabClick("deployed-survey")}
          >
            <span>Deployed</span>
            <span>Survey</span>
          </button>
          <button
            className={`main-btn ${mainTab === "survey-creation" ? "active" : ""}`}
            data-tab="survey-creation"
            onClick={() => handleMainTabClick("survey-creation")}
          >
            <span>Survey</span>
            <span>Creation</span>
          </button>
        </div>

        <div className="survey-contents">
          {/* Deployed Surveys */}
          <div
            className={`tab-content deployed-survey ${
              mainTab === "deployed-survey" ? "active" : ""
            }`}
          >
            <div className="deployed-header">
              <div className="deployed-survey-heading">
                <h3>Previously Deployed Surveys</h3>
                <p>Manage and edit your existing surveys</p>
              </div>
              <button className="new-survey-btn">
                <i className="fa fa-plus"></i> Create New Survey
              </button>
            </div>

            <div className="deployed-contents">
              <div className="deployed-actions">
                <div className="search-wrapper">
                  <i className="fa fa-search search-icon"></i>
                  <input type="text" className="search-survey" placeholder="Search a survey..." />
                </div>

                <div
                  className="timeline-dropdown"
                  id="dateDropdown"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown("dateDropdown");
                  }}
                >
                  <button className="timeline-btn">
                    <i className="fa-regular fa-calendar"></i>
                    <span className="timeline-text">{dropdownValue.dateDropdown}</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <ul
                    className="timeline-options"
                    style={{ display: dropdownOpen.dateDropdown ? "block" : "none" }}
                  >
                    <li onClick={() => pickDropdownOption("dateDropdown", "7 days")}>7 days</li>
                    <li onClick={() => pickDropdownOption("dateDropdown", "1 month")}>1 month</li>
                    <li onClick={() => pickDropdownOption("dateDropdown", "3 months")}>3 months</li>
                    <li onClick={() => pickDropdownOption("dateDropdown", "All")}>All</li>
                  </ul>
                </div>

                <div
                  className="timeline-dropdown"
                  id="statusDropdown"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown("statusDropdown");
                  }}
                >
                  <button className="timeline-btn">
                    <i className="fa-regular fa-flag"></i>
                    <span className="timeline-text">{dropdownValue.statusDropdown}</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <ul
                    className="timeline-options"
                    style={{ display: dropdownOpen.statusDropdown ? "block" : "none" }}
                  >
                    <li onClick={() => pickDropdownOption("statusDropdown", "All Status")}>
                      All Status
                    </li>
                    <li onClick={() => pickDropdownOption("statusDropdown", "Deployed")}>
                      Deployed
                    </li>
                    <li onClick={() => pickDropdownOption("statusDropdown", "Draft")}>
                      Draft
                    </li>
                  </ul>
                </div>
              </div>

              <div className="survey-container">
                <div className="survey-card">
                  <div className="survey-status">
                    <div className="survey-tags">
                      <p className="active">Active</p>
                      <p>Licensing</p>
                    </div>
                    <i className="fa fa-pause"></i>
                  </div>

                  <div className="survey-title">
                    <h3>Business Permit Satisfaction Survey</h3>
                    <p>Feedback survey for business permit renewal services</p>
                  </div>

                  <div className="survey-details">
                    <div className="department-responses">
                      <div className="department">
                        <p>Department</p>
                        <h4>Business Licensing Office</h4>
                      </div>
                      <div className="responses">
                        <p>Responses</p>
                        <h4>143</h4>
                      </div>
                    </div>
                    <div className="created-modified">
                      <div className="created">
                        <p>Created</p>
                        <h4>1/10/2024</h4>
                      </div>
                      <div className="modified">
                        <p>Modified</p>
                        <h4>1/14/2024</h4>
                      </div>
                    </div>
                  </div>

                  <div className="deployed-actions">
                    <button className="deployed-btn edit-btn">
                      <i className="fa fa-edit"></i> Edit
                    </button>
                    <button className="deployed-btn export-btn">Export</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Survey Creation */}
          <div
            className={`tab-content survey-creation ${
              mainTab === "survey-creation" ? "active" : ""
            }`}
          >
            <div className="creation-container">
              <div className="creation-subtabs">
                <button
                  className={`subtab-btn ${subTab === "basic" ? "active" : ""}`}
                  data-target="basic"
                  onClick={() => handleSubTabClick("basic")}
                >
                  Basic Setting
                </button>
                <button
                  className={`subtab-btn ${subTab === "questions" ? "active" : ""}`}
                  data-target="questions"
                  onClick={() => handleSubTabClick("questions")}
                >
                  Questions
                </button>
                <button
                  className={`subtab-btn ${subTab === "deployment" ? "active" : ""}`}
                  data-target="deployment"
                  onClick={() => handleSubTabClick("deployment")}
                >
                  Deployment
                </button>
              </div>
            </div>

            {/* Basic */}
            <div className={`subtab-content ${subTab === "basic" ? "active" : ""}`} id="basic">
              <div className="survey-information">
                <div className="basic-sett-details">
                  <h3>Survey Information</h3>

                  <form className="basic-sett-form" onSubmit={handleBasicFormSubmit}>
                    <div className="basic-sett-title">
                      <label htmlFor="survey-title">Survey Title</label>
                      <input
                        id="survey-title"
                        type="text"
                        name="survey-title"
                        placeholder="E.g., Basic Permit Satisfaction Survey"
                        required
                        value={surveyTitle}
                        onChange={(e) => {
                          setSurveyTitle(e.target.value);
                          setErrors((p) => ({ ...p, surveyTitle: undefined }));
                        }}
                      />
                      {errors.surveyTitle && <div className="error-text">{errors.surveyTitle}</div>}
                    </div>

                    <div className="basic-sett-description">
                      <label htmlFor="survey-description">Survey Description</label>
                      <textarea
                        id="survey-description"
                        name="survey-description"
                        rows="4"
                        required
                        placeholder="E.g., Feedback survey for business permit renewal services"
                        value={surveyDescription}
                        onChange={(e) => {
                          setSurveyDescription(e.target.value);
                          setErrors((p) => ({ ...p, surveyDescription: undefined }));
                        }}
                      />
                      {errors.surveyDescription && (
                        <div className="error-text">{errors.surveyDescription}</div>
                      )}
                    </div>

                    <div className="basic-sett-service-dept">
                      <div
                        className="timeline-dropdown"
                        id="serviceDropdown"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown("serviceDropdown");
                        }}
                      >
                        <label>Service</label>
                        <button className="timeline-btn" type="button">
                          <span className="timeline-text">{dropdownValue.serviceDropdown}</span>
                          <i className="fa-solid fa-chevron-down"></i>
                        </button>
                        <ul
                          className="timeline-options"
                          style={{ display: dropdownOpen.serviceDropdown ? "block" : "none" }}
                        >
                          <li onClick={() => pickDropdownOption("serviceDropdown", "Licensing")}>
                            Licensing
                          </li>
                          <li onClick={() => pickDropdownOption("serviceDropdown", "Permits")}>
                            Permits
                          </li>
                          <li onClick={() => pickDropdownOption("serviceDropdown", "Support")}>
                            Support
                          </li>
                        </ul>
                      </div>

                      <div
                        className="timeline-dropdown"
                        id="departmentDropdown"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown("departmentDropdown");
                        }}
                      >
                        <label>Department</label>
                        <button className="timeline-btn" type="button">
                          <span className="timeline-text">{dropdownValue.departmentDropdown}</span>
                          <i className="fa-solid fa-chevron-down"></i>
                        </button>
                        <ul
                          className="timeline-options"
                          style={{ display: dropdownOpen.departmentDropdown ? "block" : "none" }}
                        >
                          <li onClick={() => pickDropdownOption("departmentDropdown", "Business Licensing Office")}>
                            Business Licensing Office
                          </li>
                          <li onClick={() => pickDropdownOption("departmentDropdown", "Tax Department")}>
                            Tax Department
                          </li>
                          <li onClick={() => pickDropdownOption("departmentDropdown", "IT Department")}>
                            IT Department
                          </li>
                        </ul>
                      </div>
                    </div>     
                  </form>          
                </div>
                <div className="basic-sett-options">
                      <div className="basic-sett-details">
                        <h3>Survey Options</h3>
                        <div className="basic-sett-form">
                          <div className="basic-sett-toggle">
                            <div className="toggle-labels">
                              <h4>Allow Anonymous Responses</h4>
                              <p>Users can submit without providing personal information</p>
                            </div>
                            <label className="toggle-switch">
                              <input
                                type="checkbox"
                                id="anonymous-toggle"
                                checked={anonymousToggle}
                                onChange={(e) => setAnonymousToggle(e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>

                          <div className="basic-sett-toggle">
                            <div className="toggle-labels">
                              <h4>Collect Demographics</h4>
                              <p>Gather age, sex, and region information</p>
                            </div>
                            <label className="toggle-switch">
                              <input
                                type="checkbox"
                                id="demographics-toggle"
                                checked={demographicsToggle}
                                onChange={(e) => setDemographicsToggle(e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>
                          <div className="basic-sett-expiry-max">
                            <div className="basic-sett-field">
                              <label htmlFor="expiry-date">Expiry Date</label>
                              <input
                                type="date"
                                id="expiry-date"
                                name="expiry-date"
                                required
                                value={expiryDate}
                                onChange={(e) => {
                                  setExpiryDate(e.target.value);
                                  setErrors((p) => ({ ...p, expiryDate: undefined }));
                                }}
                              />
                              {errors.expiryDate && <div className="error-text">{errors.expiryDate}</div>}
                            </div>

                            <div className="basic-sett-field">
                              <label htmlFor="max-responses">Maximum Responses (Optional)</label>
                              <input
                                type="number"
                                id="max-responses"
                                name="max-responses"
                                min="1"
                                placeholder="100"
                                required
                                value={maxResponses}
                                onChange={(e) => {
                                  setMaxResponses(e.target.value);
                                  setErrors((p) => ({ ...p, maxResponses: undefined }));
                                }}
                              />
                              {errors.maxResponses && <div className="error-text">{errors.maxResponses}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                        <div className="proceed">
                            <button type="submit" className="proceed-btn">
                                Proceed
                            </button>
                        </div>
                    </div>
                                
              </div>
            </div>

            <div className={`subtab-content ${subTab === "questions" ? "active" : ""}`} id="questions">
              <div className="survey-information">
                <div className="basic-sett-details">
                  <h3>Survey Questions</h3>

                  <div className="type-add">
                    <div className="question-config">

                      {/* QUESTION TYPE */}
                      <div className="question-type-block">
                        <h4>Question Type</h4>

                        <div
                          className="timeline-dropdown"
                          id="questionTypeDropdown"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown("questionTypeDropdown");
                          }}
                        >
                          <button className="timeline-btn" type="button">
                            <span className="timeline-text">{dropdownValue.questionTypeDropdown}</span>
                            <i className="fa-solid fa-chevron-down"></i>
                          </button>

                          <ul
                            className="timeline-options"
                            style={{ display: dropdownOpen.questionTypeDropdown ? "block" : "none" }}
                          >
                            <li onClick={() => pickDropdownOption("questionTypeDropdown", "Checkbox")}>
                              Checkbox
                            </li>
                            <li onClick={() => pickDropdownOption("questionTypeDropdown", "Short Answer")}>
                              Short Answer
                            </li>
                            <li onClick={() => pickDropdownOption("questionTypeDropdown", "Multiple Choice")}>
                              Multiple Choice
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* QUESTION CODE */}
                      <div className="question-code-block">
                        <h4>Question Code</h4>

                        <input
                          type="text"
                          placeholder="e.g., SQ, IEQ..."
                          required
                          className="question-code-input"
                        />
                      </div>
                    </div>

                    {/* CREATE FORM BUTTON */}
                    <button className="add-questions-btn">
                      <i className="fa fa-plus"></i> Create Form
                    </button>
                  </div>

                  <div className="question-instruction">
                    <span>Question Instruction</span>
                    <textarea
                      className="instruction"
                      placeholder="Enter the instruction for respondents in this field."
                      rows="4"
                    ></textarea>

                    <div className="add-question">
                      <button className="add-questions-btn">
                        <i className="fa fa-plus"></i> Add Question
                      </button>
                    </div>
                  </div>

                  <div className="question-container">
                    {/* Question 1 */}
                    <div className="question">
                      <div className="question-header">
                        <div className="question-num-actions">
                          <h4 className="question-text">Question 1</h4>
                          <div className="required-wrapper">
                            <input type="checkbox" className="required-toggle" id="required1" />
                            <label className="toggle-switch question-required-toggle" htmlFor="required1">
                              <span className="slider"></span>
                            </label>
                            <i className="fa fa-asterisk required-icon"></i>
                          </div>
                        </div>
                        <button className="question-delete-btn">
                          <i className="fa-solid fa-trash"></i>Delete Question
                        </button>
                      </div>

                      <div className="question-label">
                        <span>Question Text</span>
                        <input type="text" className="question-label-input" placeholder="Enter your question" />
                      </div>

                      <div className="question-options">
                        <span>Question Options</span>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question1" />
                            <input type="text" placeholder="Option 1" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question1" />
                            <input type="text" placeholder="Option 2" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question1" />
                            <input type="text" placeholder="Option 3" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question1" />
                            <input type="text" placeholder="Option 4" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <button className="add-option-btn">
                          <i className="fa fa-plus"></i> Add Option
                        </button>
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="question">
                      <div className="question-header">
                        <div className="question-num-actions">
                          <h4 className="question-text">Question 2</h4>
                          <div className="required-wrapper">
                            <input type="checkbox" className="required-toggle" id="required2" />
                            <label className="toggle-switch question-required-toggle" htmlFor="required2">
                              <span className="slider"></span>
                            </label>
                            <i className="fa fa-asterisk required-icon"></i>
                          </div>
                        </div>
                        <button className="question-delete-btn">
                          <i className="fa-solid fa-trash"></i>Delete Question
                        </button>
                      </div>

                      <div className="question-label">
                        <span>Question Text</span>
                        <input type="text" className="question-label-input" placeholder="Enter your question" />
                      </div>

                      <div className="question-options">
                        <span>Question Options</span>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question2" />
                            <input type="text" placeholder="Option 1" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question2" />
                            <input type="text" placeholder="Option 2" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question2" />
                            <input type="text" placeholder="Option 3" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <div className="option-item">
                          <div className="option">
                            <input type="radio" name="question2" />
                            <input type="text" placeholder="Option 4" />
                          </div>
                          <button className="option-delete-btn">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>

                        <button className="add-option-btn">
                          <i className="fa fa-plus"></i> Add Option
                        </button>
                      </div>
                    </div>

                    {/* Question 3 */}
                    <div className="question">
                      <div className="question-header">
                        <div className="question-num-actions">
                          <h4 className="question-text">Question 3</h4>
                          <div className="required-wrapper">
                            <input type="checkbox" className="required-toggle" id="required3" />
                            <label className="toggle-switch question-required-toggle" htmlFor="required3">
                              <span className="slider"></span>
                            </label>
                            <i className="fa fa-asterisk required-icon"></i>
                          </div>
                        </div>
                        <button className="question-delete-btn">
                          <i className="fa-solid fa-trash"></i>Delete Question
                        </button>
                      </div>

                      <div className="question-label">
                        <span>Question Text</span>
                        <input type="text" className="question-label-input" placeholder="Enter your question" />
                      </div>
                    </div>

                    {/* Question 4 */}
                    <div className="question">
                      <div className="question-header">
                        <div className="question-num-actions">
                          <h4 className="question-text">Question 4</h4>
                          <div className="required-wrapper">
                            <input type="checkbox" className="required-toggle" id="required4" />
                            <label className="toggle-switch question-required-toggle" htmlFor="required4">
                              <span className="slider"></span>
                            </label>
                            <i className="fa fa-asterisk required-icon"></i>
                          </div>
                        </div>
                        <button className="question-delete-btn">
                          <i className="fa-solid fa-trash"></i>Delete Question
                        </button>
                      </div>

                      <div className="question-label">
                        <span>Question Text</span>
                        <input type="text" className="question-label-input" placeholder="Enter your question" />
                      </div>

                      <div className="question-options">
                        <span>Answer</span>
                        <div className="option-item">
                          <div className="option">
                            <textarea
                              className="instruction short-answer"
                              placeholder="Enter your short answer here..."
                              rows="4"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="proceed">
                    <button type="submit" className="proceed-btn">
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment */}
            <div
              className={`subtab-content ${subTab === "deployment" ? "active" : ""}`}
              id="deployment"
            >
              <div className="survey-information">
                <div className="basic-sett-details">
                  <h3>Deployment Settings</h3>

                  <div className="status-actions">
                    <div className="deployment-status">
                      <h4>Status</h4>
                      <div
                        className="timeline-dropdown"
                        id="deploymentStatusDropdown"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown("deploymentStatusDropdown");
                        }}
                      >
                        <button className="timeline-btn" type="button">
                          <span className="timeline-text">{dropdownValue.deploymentStatusDropdown}</span>
                          <i className="fa-solid fa-chevron-down"></i>
                        </button>
                        <ul
                          className="timeline-options"
                          style={{ display: dropdownOpen.deploymentStatusDropdown ? "block" : "none" }}
                        >
                          <li onClick={() => pickDropdownOption("deploymentStatusDropdown", "Draft")}>
                            Draft
                          </li>
                          <li onClick={() => pickDropdownOption("deploymentStatusDropdown", "Deployed")}>
                            Deployed
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="actions">
                      <button className="proceed-btn">Preview</button>
                      <button className="proceed-btn">Deploy Survey</button>
                    </div>
                  </div>
                </div>

                <div className="deployment-details">
                  <div className="total-responses">
                    <h4>0</h4>
                    <h4>Total Responses</h4>
                  </div>

                  <div className="average-ratings">
                    <h4>0</h4>
                    <h4>Average Rating</h4>
                  </div>

                  <div className="expiry-date">
                    <h4>11/29/2025</h4>
                    <h4>Expiry Date</h4>
                  </div>

                  <div className="no-of-questions">
                    <h4>4</h4>
                    <h4>Questions</h4>
                  </div>
                </div>

       <div className="basic-sett-details">
            <h3>Survey Access</h3>

            <div className="survey-code">
                <div className="code">
                <button className="copy-code" onClick={handleCopyCode}>
                    <i className="fa-regular fa-copy"></i> Copy Code
                </button>
                <span>{SURVEY_CODE}</span>
                </div>

                <button
                id="generateQR"
                className="generate-qr-btn"
                onClick={handleGenerateQR}
                >
                <i className="fa fa-qrcode"></i> Generate Survey QR Code
                </button>
            </div>

            {qrVisible && (
                <div
                id="qrCodeContainer"
                ref={qrContainerRef}
                style={{
                    marginTop: "1.5rem",
                    textAlign: "center",
                    padding: "1rem",
                    backgroundColor: "#fff",
                    border: "1px dashed #CCC",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                />
            )}
            </div>


                <div className="proceed">
                  <button type="submit" className="proceed-btn">
                    Deploy Survey
                  </button>
                </div>
              </div>
            </div>
            {/* END deployment */}
          </div>
        </div>
      </div>
  );
}