export default function TakeSurvey() {
  return (
    <>
      <section className="take-survey" id="take-survey">
        <h1>Access Your Survey</h1>
        <p>
          This ARTA-Compliant Customer Satisfaction Survey ensures your feedback directly contributes to
          more efficient and citizen-friendly services in Valenzuela City.
        </p>

        <div className="survey-code">
          <input 
            type="number" 
            className="code-input"
            placeholder="Enter a code"
          />
          <button 
            type="submit" 
            className="code-submit-btn"
          >
            Join
          </button>
        </div>
      </section>
    </>
  );
}
