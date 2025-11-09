import { NavLink } from "react-router-dom";
import illustration from "../assets/images/illustration.jpg";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <>
      <section className="landing-cta" id="landing-cta">
        <div className="cta">
          <h1>Voicing Facts to Improve the Governance of Valenzuela</h1>
          <p>
            This ARTA-Compliant Customer Satisfaction Survey ensures your feedback directly contributes 
            to more efficient and citizen-friendly services in Valenzuela City.
          </p>
          
          <NavLink to="/take-survey"> 
            <button className="cta-btn" type="submit">Take a Survey</button>
          </NavLink>  
        </div>
        <div className="illustration">
          <img src={illustration} alt="illustration" />
        </div>
      </section>
      
      <section className="how-it-works" id="how-it-works">
        <div className="how-it-works-heading">
          <h1>How do SatisFacts work?</h1>
        </div>

        <div className="steps-container">
          <div className="step-card" data-step="01">
            <i className="fa-solid fa-qrcode"></i>
            <div className="step-details">
              <span>STEP 1</span>
              <h3>Access the Form</h3>
            </div>
          </div>

          <div className="step-card" data-step="02">
            <i className="fa-solid fa-pen-to-square"></i>
            <div className="step-details">
              <span>STEP 2</span>
              <h3>Answer Survey</h3>
            </div>
          </div>

          <div className="step-card" data-step="03">
            <i className="fa-solid fa-link"></i>
            <div className="step-details">
              <span>STEP 3</span>
              <h3>Submit</h3>
            </div>
          </div>

          <div className="step-card" data-step="04">
            <i className="fa-solid fa-file-export"></i>
            <div className="step-details">
              <span>STEP 4</span>
              <h3>Export a Copy</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="faqs" id="faqs">
        <div className="faqs-heading" id="faqs-heading">
          <h1>FAQs</h1>
          <p>
            Curious about the most asked questions about SatisFacts? Check out our Frequently Asked Questions to get quick answers, tips, and helpful guidance. If you can’t find what you’re looking for, 
            reach out to our support team for assistance.
          </p>
        </div>

        <div className="faqs-main">
          <div className="faqs-accordion">
            <FAQ
              question="How long does it take to answer?"
              answer="The survey is designed to be short and simple. On average, it will only take you 2–3 minutes to complete. Most questions are multiple-choice or rating scales, so you can quickly share your feedback without any hassle."
            />
            <FAQ
              question="Is my data secure?"
              answer="Yes. All responses are encrypted and stored securely in compliance with the Data Privacy Act of 2012. No personal information is required unless you choose to provide it."
            />
            <FAQ
              question="What will my feedback be used for?"
              answer="Your feedback is used to evaluate and improve government services. Results are analyzed under ARTA standards to make processes more efficient and citizen-friendly."
            />
            <FAQ
              question="Can I answer the survey offline?"
              answer="Yes. You can complete the survey even without internet. Your answers are saved locally and will sync automatically once you reconnect online."
            />
          </div>
        </div>
      </section>
    </>
  );
}
