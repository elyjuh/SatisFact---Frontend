import { useState } from "react";
import logo from "../assets/images/valenzuela-logo.png";
import footerBg from "../assets/images/footer.png";

import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import TermsModal from "../components/TermsModal";

export default function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
      <footer 
        className="footer"
        style={{ backgroundImage: `url(${footerBg})` }}
      >
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="footer-content">
          <div className="footer-left">
            <h4>City Government of Valenzuela</h4>
            <p>The City Hall, MacArthur Highway, Karuhatan, Valenzuela City, Metro Manila</p>
          </div>

          <div className="footer-right">
            <div className="footer-socials">
              <a href="https://www.facebook.com/ValenzuelaCityGov/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/valenzuelacity" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/valenzuelacitygov/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://valenzuela.gov.ph/" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe"></i>
              </a>
            </div>

            <div className="footer-links">
              <button 
                type="button" 
                className="footer-link-btn"
                onClick={() => setShowPrivacyModal(true)}
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button 
                type="button" 
                className="footer-link-btn"
                onClick={() => setShowTermsModal(true)}
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

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
