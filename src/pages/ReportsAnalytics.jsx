import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../assets/admin.css';

// District mappings
const DISTRICT1 = ['Dalandanan', 'Malinta', 'Malanday', 'Palasan', 'Pariancillo Villa'];
const DISTRICT2 = ['Bagbaguin', 'Karuhatan', 'Gen. T. de Leon', 'Mapulang Lupa', 'Maysan'];

// Sample data (used if no props are passed)
const sampleData = [
  { name: 'Dalandanan', value: 12 },
  { name: 'Malinta', value: 14 },
  { name: 'Malanday', value: 11 },
  { name: 'Palasan', value: 10 },
  { name: 'Pariancillo Villa', value: 9 },
  { name: 'Bagbaguin', value: 20 },
  { name: 'Karuhatan', value: 18 },
  { name: 'Gen. T. de Leon', value: 17 },
  { name: 'Mapulang Lupa', value: 15 },
  { name: 'Maysan', value: 12 },
];

export default function Reports({ barangayData = [] }) {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);

  // Refs
  const ageRef = useRef(null);
  const sexRef = useRef(null);
  const districtRef = useRef(null);
  const clientsRef = useRef(null);
  const serviceRef = useRef(null);
  const payrollRef = useRef(null);
  const itRef = useRef(null);

  // Charts
  const ageChart = useRef(null);
  const sexChart = useRef(null);
  const districtChart = useRef(null);
  const clientsChart = useRef(null);
  const serviceChart = useRef(null);
  const payrollChart = useRef(null);
  const itChart = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.timeline-dropdown')) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const data = barangayData.length ? barangayData : sampleData;

  // Sum values for each district
  const getDistrictTotals = () => {
    const d1Total = data
      .filter(b => DISTRICT1.includes(b.name))
      .reduce((sum, b) => sum + b.value, 0);
    const d2Total = data
      .filter(b => DISTRICT2.includes(b.name))
      .reduce((sum, b) => sum + b.value, 0);
    return [d1Total, d2Total];
  };

  useEffect(() => {
    const colors = ['#2872CB', '#6EC1E4', '#6C63FF', '#01277E', '#F6A560', '#FF6B6B'];

    // --- Age Chart ---
    if (ageRef.current) {
      const ctx = ageRef.current.getContext('2d');
      ageChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['18-25', '26-35', '36-45', '46-60', '60+'],
          datasets: [{
            label: 'Population',
            data: [80, 120, 95, 60, 30],
            backgroundColor: colors.slice(0,5),
          }],
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } }, scales: { y: { beginAtZero: true } } },
      });
    }

    // --- Sex Chart ---
    if (sexRef.current) {
      const ctx = sexRef.current.getContext('2d');
      sexChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Female', 'Male'],
          datasets: [{
            label: 'Percentage',
            data: [58, 42],
            backgroundColor: [colors[1], colors[0]],
          }],
        },
        options: {
          plugins: { legend: { display: true, position: 'bottom' } },
          scales: { y: { min: 0, max: 100 } },
        },
      });
    }

    // --- District Chart ---
    if (districtRef.current) {
      const ctx = districtRef.current.getContext('2d');
      const [d1, d2] = getDistrictTotals();
      districtChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['District 1', 'District 2'],
          datasets: [{
            label: 'Region Distribution',
            data: [d1, d2],
            backgroundColor: [colors[0], colors[1]],
          }],
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } }, scales: { y: { beginAtZero: true } } },
      });
    }

    // --- Client Trends ---
    if (clientsRef.current) {
      const ctx = clientsRef.current.getContext('2d');
      clientsChart.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Clients',
            data: [100, 150, 130, 180, 200, 220, 240],
            borderColor: colors[0],
            backgroundColor: 'rgba(40,114,203,0.2)',
            fill: true,
            tension: 0.3,
          }],
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } } },
      });
    }

    // --- Service Satisfaction ---
    if (serviceRef.current) {
      const ctx = serviceRef.current.getContext('2d');
      serviceChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Permit Renewal', 'Tax Payment', 'Documents Request'],
          datasets: [{
            label: 'Satisfaction',
            data: [4.2, 4.7, 4.1],
            backgroundColor: colors.slice(2,5),
          }],
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } }, scales: { y: { min: 0, max: 5 } } },
      });
    }

    // --- Payroll Survey ---
    if (payrollRef.current) {
      const ctx = payrollRef.current.getContext('2d');
      payrollChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree', 'N/A'],
          datasets: [{
            label: 'Payroll Survey',
            data: [5, 10, 15, 40, 25, 5],
            backgroundColor: colors,
          }],
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } }, scales: { y: { beginAtZero: true } } },
      });
    }

    // --- IT Survey ---
    if (itRef.current) {
      const ctx = itRef.current.getContext('2d');
      itChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree', 'N/A'],
          datasets: [{
            label: 'IT Survey',
            data: [2, 8, 20, 35, 30, 5],
            backgroundColor: colors,
          }],
        },
        options: { plugins: { legend: { display: true, position: 'bottom' } }, scales: { y: { beginAtZero: true } } },
      });
    }

    // Cleanup
    return () => {
      [ageChart, sexChart, districtChart, clientsChart, serviceChart, payrollChart, itChart].forEach(ref => {
        if (ref.current) ref.current.destroy();
      });
    };
  }, [data]);

  return (
    <div className="admin-content">
      <div className="overview-header">
        <h2>Reports</h2>
        <div className="timeline-dropdown">
          <button className={`timeline-btn ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
            <i className="fa-regular fa-calendar" /><span>{filter}</span>
            <i className="fa-solid fa-chevron-down" />
          </button>
          <ul className="timeline-options" style={{ display: open ? 'block' : 'none' }}>
            {['All', '3 days', '7 days', 'Month'].map(opt => (
              <li key={opt} onClick={() => { setFilter(opt); setOpen(false); }}>{opt}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Demographics + District */}
      <h3 className="report-header">Demographic Profile</h3>
      <div className="charts-grid">
        <div className="chart-card"><h4>Age Distribution</h4><canvas ref={ageRef}></canvas></div>
        <div className="chart-card"><h4>Sex Distribution</h4><canvas ref={sexRef}></canvas></div>
        <div className="chart-card"><h4>Region Distribution</h4><canvas ref={districtRef}></canvas></div>
      </div>

      {/* Trends */}
      <h3 className="report-header">Trends</h3>
      <div className="charts-grid">
        <div className="chart-card"><h4>Client Trends</h4><canvas ref={clientsRef}></canvas></div>
        <div className="chart-card"><h4>Service Satisfaction</h4><canvas ref={serviceRef}></canvas></div>
      </div>

      {/* Surveys */}
      <h3 className="report-header">Survey Results</h3>
      <div className="charts-grid">
        <div className="chart-card"><h4>Payroll Evaluation Survey</h4><canvas ref={payrollRef}></canvas></div>
        <div className="chart-card"><h4>IT Support Survey</h4><canvas ref={itRef}></canvas></div>
      </div>
    </div>
  );
}
