import { useEffect } from "react";
import Modal from "./Modal";

export default function TermsModal({ isOpen, onClose }) {

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
    <Modal title="Terms & Conditions" isOpen={isOpen} onClose={onClose}>
      <p>
        Welcome to the <strong>SatisFacts</strong>: A web-based ARTA-Compliant Customer
        Satisfaction Survey (CSS) System of the City Government of Valenzuela.
        By accessing or using this system, you agree to be bound by the following terms
        and conditions. Please read them carefully before participating.
      </p>
      <h3>Acceptance of Terms</h3>
      <p>
        By using this survey platform, you acknowledge that you have read, understood,
        and agreed to these Terms and Conditions as well as our Privacy Policy. If you
        do not agree, you must refrain from using the system.
      </p>
      <h3>Purpose of the System</h3>
      <p>This system is designed to:</p>
      <ul>
        <li>
          Collect feedback from citizens regarding government services, in compliance
          with the Anti-Red Tape Authority (ARTA) guidelines.
        </li>
        <li>
          Help improve service delivery and transparency within the City Government of
          Valenzuela.
        </li>
      </ul>
      <h3>User Responsibilities</h3>
      <p>When using this system, you agree to:</p>
      <ul>
        <li>Provide truthful and accurate information when completing surveys.</li>
        <li>Use the system only for its intended purpose (citizen feedback).</li>
        <li>Refrain from submitting malicious, offensive, or fraudulent responses.</li>
      </ul>
      <h3>Account Creation</h3>
      <p>You may be required to create an account. By doing so, you agree to:</p>
      <ul>
        <li>Keep your login credentials confidential.</li>
        <li>Be responsible for all activities conducted under your account.</li>
        <li>Notify the system administrator immediately in case of unauthorized access.</li>
      </ul>
      <h3>Data Usage and Privacy</h3>
      <p>
        All data collected through the system will be handled in accordance with the
        Privacy Policy and the Data Privacy Act of 2012 (RA 10173). The City Government
        of Valenzuela ensures that data will only be used for service improvement,
        compliance reporting, and lawful purposes.
      </p>
    </Modal>
  );
}
