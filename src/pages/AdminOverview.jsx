import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import '../assets/admin.css';

export default function AdminOverview() {
  const [timeline, setTimeline] = useState('7 days');
  const [optionsOpen, setOptionsOpen] = useState(false);
  const trendRef = useRef(null);
  const regionRef = useRef(null);
  const trendChartRef = useRef(null);
  const regionChartRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!e.target.closest('.timeline-dropdown')) {
        setOptionsOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    // create Trend chart
    const trendCtx = trendRef.current && trendRef.current.getContext('2d');
    if (trendCtx) {
      const gradient = trendCtx.createLinearGradient(0, 0, trendCtx.canvas.width, 0);
      gradient.addColorStop(0, '#2872CB');
      gradient.addColorStop(1, '#01277E');

      trendChartRef.current = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','June','July'],
          datasets: [{
            label: 'Average Ratings',
            data: [3.5, 4.0, 4.5, 3.5, 4.0, 4.1, 4.5],
            borderColor: gradient,
            backgroundColor: 'rgba(40,114,203,0.12)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { min: 0, max: 5 },
            x: { }
          }
        }
      });
    }

    // create Region chart
    const regionCtx = regionRef.current && regionRef.current.getContext('2d');
    if (regionCtx) {
      const vGrad = regionCtx.createLinearGradient(0, 0, 0, regionCtx.canvas.height);
      vGrad.addColorStop(0, '#2872CB');
      vGrad.addColorStop(1, '#01277E');

      regionChartRef.current = new Chart(regionCtx, {
        type: 'bar',
        data: {
          labels: ['NCR','III','I','VII','VI'],
          datasets: [{
            label: 'Responses',
            data: [250,230,190,140,70],
            backgroundColor: vGrad
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }

    return () => {
      if (trendChartRef.current) {
        trendChartRef.current.destroy();
        trendChartRef.current = null;
      }
      if (regionChartRef.current) {
        regionChartRef.current.destroy();
        regionChartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="admin-content">
      <div className="overview-header">
        <h2>Overview</h2>

        <div className="timeline-dropdown">
          <button
            className={`timeline-btn ${optionsOpen ? 'active' : ''}`}
            onClick={() => setOptionsOpen(v => !v)}
          >
            <i className="fa-regular fa-calendar" />
            <span className="timeline-text">{timeline}</span>
            <i className="fa-solid fa-chevron-down" />
          </button>

          <ul className="timeline-options" style={{ display: optionsOpen ? 'block' : 'none' }}>
            <li onClick={() => { setTimeline('7 days'); setOptionsOpen(false); }} data-value="7days">7 days</li>
            <li onClick={() => { setTimeline('1 month'); setOptionsOpen(false); }} data-value="1month">1 month</li>
            <li onClick={() => { setTimeline('3 months'); setOptionsOpen(false); }} data-value="3months">3 months</li>
            <li onClick={() => { setTimeline('All'); setOptionsOpen(false); }} data-value="all">All</li>
          </ul>
        </div>
      </div>

      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-count">
            <i className="fa-solid fa-list-check stat-icon" />
            <h3>109</h3>
          </div>
          <p>Total Surveys</p>
        </div>

        <div className="stat-card">
          <div className="stat-count">
            <i className="fa-solid fa-star stat-icon" />
            <h3>4.2 / 5</h3>
          </div>
          <p>Average Ratings</p>
        </div>

        <div className="stat-card stat-card-large">
          <div className="stat-row">
            <div className="stat">
              <div className="stat-count">
                <i className="fa-solid fa-user stat-icon" />
                <h3>79</h3>
              </div>
              <p>Residents</p>
            </div>
            <div className="stat">
              <div className="stat-count">
                <i className="fa-solid fa-briefcase stat-icon" />
                <h3>19</h3>
              </div>
              <p>Businesses</p>
            </div>
            <div className="stat">
              <div className="stat-count">
                <i className="fa-solid fa-building stat-icon" />
                <h3>11</h3>
              </div>
              <p>Governance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h4>Satisfaction Trends</h4>
          <canvas id="trendChart" ref={trendRef} />
        </div>
        <div className="chart-card">
          <h4>Regional Distribution</h4>
          <canvas id="regionChart" ref={regionRef} />
        </div>
      </div>

      <div className="feedback-section">
        <div className="feedback-header highlight-header">
          <h4>Recent Feedback Highlights</h4>
          <button className="view-all-btn outlined">View All</button>
        </div>

        <div className="feedback-contents">
          <div className="feedback-card">
            <div className="feedback-info">
              <p>Business Permit Renewal</p>
              <small>19 Responses</small>
            </div>
            <div className="feedback-rating">
              <span>
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star-half-stroke" />
                <i className="fa-regular fa-star" />
                <small>4.2</small>
              </span>
              <span className="rating-label good">Good</span>
            </div>
          </div>

          <div className="feedback-card">
            <div className="feedback-info">
              <p>Tax Payment</p>
              <small>11 Responses</small>
            </div>
            <div className="feedback-rating">
              <span>
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star-half-stroke" />
                <small>4.7</small>
              </span>
              <span className="rating-label excellent">Excellent</span>
            </div>
          </div>

          <div className="feedback-card">
            <div className="feedback-info">
              <p>Documents Request</p>
              <small>79 Responses</small>
            </div>
            <div className="feedback-rating">
              <span>
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-regular fa-star" />
                <i className="fa-regular fa-star" />
                <small>4.1</small>
              </span>
              <span className="rating-label good">Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
