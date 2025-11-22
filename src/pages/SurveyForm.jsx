import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/survey-process.css"; 

const SQD_LABELS = {
    "strongly-agree": "Strongly Agree",
    agree: "Agree",
    neutral: "Neutral",
    disagree: "Disagree",
    "strongly-disagree": "Strongly Disagree",
    na: "Not Applicable",
};

export default function SurveyForm() {
    const [ccAnswers, setCcAnswers] = useState({ cc1: "", cc2: "", cc3: "" });
    const [sqdAnswers, setSqdAnswers] = useState({ sqd0: "", sqd1: "", sqd2: "" });
    const [comments, setComments] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleCcChange = (e) => {
        setCcAnswers({ ...ccAnswers, [e.target.name]: e.target.value });
        setErrors(errors.filter((err) => err !== e.target.name));
    };

    const handleSqdChange = (e) => {
        setSqdAnswers({ ...sqdAnswers, [e.target.name]: e.target.value });
        setErrors(errors.filter((err) => err !== e.target.name));
    };

    const validateSurvey = () => {
        const newErrors = [];

        if (!ccAnswers.cc1) newErrors.push("cc1");
        if (ccAnswers.cc1 && ccAnswers.cc1 !== "4") {
            if (!ccAnswers.cc2) newErrors.push("cc2");
            if (!ccAnswers.cc3) newErrors.push("cc3");
        }

        Object.entries(sqdAnswers).forEach(([key, value]) => {
            if (!value) newErrors.push(key);
        });

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (validateSurvey()) {
            console.log({ ccAnswers, sqdAnswers, comments, email });
            navigate("/take-survey/completion");
        }
    };

    const hasError = (field) => errors.includes(field);

    return (
        <div className="survey-form-container">
            <div className="page-header survey-header">
                <div className="header-texts">
                    <div className="form-title">Citizen’s Charter (CC) Survey</div>
                    <p className="form-desc2">Your feedback helps us improve our services</p>
                </div>
                <button className="btn-back" onClick={() => navigate('/take-survey/registration')}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* CC Section */}
                <div className="take-survey-container">
                    <div className="header-box">
                        <div className="icon"><i className="fa-solid fa-circle-check"></i></div>
                        <div className="header-text">
                            <div className="header-sub">
                                Please place a check mark (✓) in the box that best represents your answer. The Citizen’s Charter outlines government services, requirements, fees, and processing times.
                            </div>
                        </div>
                    </div>

                    <div className="question-list">
                        {/* CC1 */}
                        <div className={`question-block ${hasError("cc1") ? "error" : ""}`}>
                            <div className="cc-code">CC1</div>
                            <div className="cc-question-side">
                                <div className="question-title">
                                    What of the following best describes your awareness of a CC? 
                                    <span className="required-asterisk">{!ccAnswers.cc1 && "*"}</span>
                                    {hasError("cc1") && submitted && <div className="error-text">This field is required.</div>}
                                </div>
                                <div className="choices">
                                    {[ 
                                        { value: "1", text: "I know what a CC is and I saw this office’s CC." },
                                        { value: "2", text: "I know what a CC is but did not see this office’s CC." },
                                        { value: "3", text: "I learned of the CC only when I saw this office’s CC." },
                                        { value: "4", text: "I do not know what a CC is and I did not see one in the office (Answer N/A on CC2 and CC3)" },
                                    ].map(opt => (
                                        <label className="choice-item" key={opt.value}>
                                            <input
                                                className="custom-check"
                                                type="radio"
                                                name="cc1"
                                                value={opt.value}
                                                checked={ccAnswers.cc1 === opt.value}
                                                onChange={handleCcChange}
                                            />
                                            <span>{opt.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CC2 */}
                        {ccAnswers.cc1 !== "4" && (
                            <div className={`question-block ${hasError("cc2") ? "error" : ""}`}>
                                <div className="cc-code">CC2</div>
                                <div className="cc-question-side">
                                    <div className="question-title">
                                        If aware of CC, would you say that the CC of the office was ...? 
                                        <span className="required-asterisk">{!ccAnswers.cc2 && "*"}</span>
                                        {hasError("cc2") && submitted && <div className="error-text">This field is required.</div>}
                                    </div>
                                    <div className="choices">
                                        {[ 
                                            { value: "easy", text: "Easy to see" },
                                            { value: "somewhat_easy", text: "Somewhat easy to see" },
                                            { value: "difficult", text: "Difficult to see" },
                                            { value: "not_visible", text: "Not visible at all" },
                                            { value: "na", text: "Not Applicable" },
                                        ].map(opt => (
                                            <label className="choice-item" key={opt.value}>
                                                <input
                                                    className="custom-check"
                                                    type="radio"
                                                    name="cc2"
                                                    value={opt.value}
                                                    checked={ccAnswers.cc2 === opt.value}
                                                    onChange={handleCcChange}
                                                />
                                                <span>{opt.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CC3 */}
                        {ccAnswers.cc1 !== "4" && (
                            <div className={`question-block ${hasError("cc3") ? "error" : ""}`}>
                                <div className="cc-code">CC3</div>
                                <div className="cc-question-side">
                                    <div className="question-title">
                                        If aware of CC, how much did the CC help you in your transaction? 
                                        <span className="required-asterisk">{!ccAnswers.cc3 && "*"}</span>
                                        {hasError("cc3") && submitted && <div className="error-text">This field is required.</div>}
                                    </div>
                                    <div className="choices">
                                        {[ 
                                            { value: "very_much", text: "Helped very much" },
                                            { value: "somewhat", text: "Somewhat helped" },
                                            { value: "not_help", text: "Did not help" },
                                            { value: "na", text: "Not Applicable" },
                                        ].map(opt => (
                                            <label className="choice-item" key={opt.value}>
                                                <input
                                                    className="custom-check"
                                                    type="radio"
                                                    name="cc3"
                                                    value={opt.value}
                                                    checked={ccAnswers.cc3 === opt.value}
                                                    onChange={handleCcChange}
                                                />
                                                <span>{opt.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Likert Section */}
                <div className="take-survey-container">
                    <div className="header-box">
                        <div className="icon"><i className="fa-solid fa-thumbs-up"></i></div>
                        <div className="header-text">
                            <div className="header-sub">
                                For SQD 0–8, choose the option that best reflects your answer.
                            </div>
                        </div>
                    </div>

                    <div className="question-list">
                        {Object.keys(sqdAnswers).map((key, idx) => (
                            <div className={`likert-block ${hasError(key) ? "error" : ""}`} key={key}>
                                <div className="likert-top">
                                    <div className="likert-code">SQD {idx}</div>
                                    <div className="likert-question">
                                        {key === "sqd0" ? "I am satisfied with the service that I availed."
                                        : key === "sqd1" ? "I spent a reasonable amount of time for my transaction."
                                        : "The office followed the transaction’s requirements and steps based on the information provided."}
                                        <span className="required-asterisk">{!sqdAnswers[key] && "*"}</span>
                                    </div>
                                    {hasError(key) && submitted && <div className="error-text">This field is required.</div>}
                                </div>
                                <div className="likert-choices">
                                    {[ 
                                        { value: "strongly-disagree", icon: "fa-regular fa-face-angry" },
                                        { value: "disagree", icon: "fa-regular fa-face-frown-open" },
                                        { value: "neutral", icon: "fa-regular fa-face-meh" },
                                        { value: "agree", icon: "fa-regular fa-face-smile" },
                                        { value: "strongly-agree", icon: "fa-regular fa-face-laugh-beam" },
                                        { value: "na", icon: null, text: "N/A" },
                                    ].map(opt => (
                                        <label className={`likert-choice ${opt.value === "na" ? "likert-na" : ""}`} key={opt.value}>
                                            <input
                                                type="radio"
                                                name={key}
                                                value={opt.value}
                                                checked={sqdAnswers[key] === opt.value}
                                                onChange={handleSqdChange}
                                            />
                                            <span className={`icon-wrapper ${opt.value === "na" ? "na" : ""}`}>
                                                {opt.icon ? <i className={opt.icon}></i> : <span className="likert-na-text">N/A</span>}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <div className="likert-selected-label">{sqdAnswers[key] ? SQD_LABELS[sqdAnswers[key]] : ""}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="take-survey-container">
                    <div className="header-box">
                        <div className="icon"><i className="far fa-comment-dots"></i></div>
                        <div className="header-text">
                            <div className="header-sub">Help us improve by sharing your thoughts (Optional)</div>
                        </div>
                    </div>
                    <div className="question-list">
                        <div className="comments-block">
                            <div className="comments">
                                <label htmlFor="comments">Additional comments or suggestions for improvements</label>
                                <textarea
                                    className="comments-textarea"
                                    id="comments"
                                    name="comments"
                                    rows={5}
                                    placeholder="Share your thoughts on how we can improve our services..."
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                />
                            </div>
                            <div className="comments-email">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    className="email-input"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="user@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="comments-note">
                                Providing your email allows us to follow up with you on your feedback if needed.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="survey-btn-area">
                    <button type="submit" className="btn-next-out">
                        Submit Survey
                    </button>
                </div>
            </form>
        </div>
    );
}
