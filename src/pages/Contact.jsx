export default function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="contact-heading">
          <h1>Contact Support</h1>
          <p>
            Need help with the survey system? Fill out the form below and our team will assist you.
          </p>
        </div>

        <form action="" className="contact-form">
          <div className="name-and-email">
            <div className="contact-name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="name-input"
                name="name"
                placeholder="e.g., Hally E. Imbawa"
              />
            </div>

            <div className="contact-email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="email-input"
                name="email"
                placeholder="e.g., halimbawa@gmail.com"
              />
            </div>
          </div>

          <div className="contact-subject">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="subject-input" name="subject" placeholder="e.g., Survey not submitting." />
          </div>

          <div className="contact-message">
            <label htmlFor="message-area">Message</label>
            <textarea
              name="message-area"
              id="message-area"
              rows="5"
              placeholder="Enter your message here..."
            ></textarea>
          </div>

          <button type="submit" className="contact-submit-btn">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
