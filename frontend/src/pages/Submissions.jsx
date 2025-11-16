export default function Submissions() {
  return (
    <section className="submissions" id="submissions">
      <div className="submission-heading">
        <h1>Past Submission</h1>
        <p>
          Here are the surveys you've completed. You can view details and
          export your answers.
        </p>
      </div>

      <div className="submissions-area">
        <div className="submission-card">
          <div className="title-and-status">
            <div className="status">
              <span>Completed</span>
            </div>
            <div className="title">
              <h4>Client Satisfaction Measurement</h4>
            </div>
          </div>

          <div className="date-and-actions">
            <div className="date">
              <i className="fa-solid fa-calendar-days"></i>
              <p>10/02/2025</p>
            </div>
            <button className="export-pdf-btn">Generate PDF</button>
            <button className="export-excel-btn">Generate Excel</button>
            <button className="view-answer">View</button>
          </div>
        </div>
      </div>
    </section>
  );
}
