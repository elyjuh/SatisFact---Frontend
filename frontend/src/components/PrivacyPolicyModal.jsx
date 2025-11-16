import { useEffect } from "react";
import Modal from "./Modal";

export default function PrivacyPolicyModal({ isOpen, onClose }) {

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";   
      }

      return () => {
        document.body.style.overflow = "auto";  
      };
    }, [isOpen]);


  return (
    <Modal title="Privacy Policy" isOpen={isOpen} onClose={onClose}>
      <p>
        The <strong>City Government of Valenzuela</strong> is committed to protecting
        your personal information in compliance with the Data Privacy Act of 2012
        (RA 10173) and related issuances of the National Privacy Commission (NPC).
      </p>
      <p>
        This Privacy Policy explains how we collect, use, store, and protect your data
        when you participate in our ARTA-Compliant Customer Satisfaction Survey (CSS)
        and related feedback systems.
      </p>
      <h3>Information We Collect</h3>
      <ul>
        <li>Basic demographic information (e.g., age bracket, gender, service location)</li>
        <li>Service-related responses (e.g., feedback on government services)</li>
        <li>Device and technical information (e.g., browser type, IP address, cookies)</li>
        <li>Any other information you voluntarily provide</li>
      </ul>
      <p>
        We do not require or collect sensitive personal information unless explicitly
        necessary and consented to.
      </p>
      <h3>How We Use Your Information</h3>
      <ul>
        <li>Measuring compliance with ARTA Citizen’s Charter requirements</li>
        <li>Improving government service delivery</li>
        <li>Generating aggregated reports for decision-making</li>
        <li>Ensuring transparency and accountability in public services</li>
      </ul>
      <h3>Data Sharing and Disclosure</h3>
      <ul>
        <li>Survey results are reported in aggregate form only.</li>
        <li>No personally identifiable information is disclosed without your consent.</li>
        <li>Data may be shared with authorized government agencies only when required by law.</li>
      </ul>
      <h3>Your Rights under the Data Privacy Act</h3>
      <ul>
        <li>Be informed of how your data is processed</li>
        <li>Access your personal data</li>
        <li>Correct or update your data</li>
        <li>Withdraw consent</li>
        <li>File complaints with the National Privacy Commission (NPC)</li>
      </ul>
      <h3>Security Measures</h3>
      <ul>
        <li>Data encryption (in transit and at rest)</li>
        <li>Role-based access control</li>
        <li>Audit logging and monitoring</li>
        <li>Regular security reviews and updates</li>
      </ul>
    </Modal>
  );
}
