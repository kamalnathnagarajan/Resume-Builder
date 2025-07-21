import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    summary: '',
    education: '',
    skills: '',
    experience: ''
  });

  const [darkMode, setDarkMode] = useState(false);
  const resumeRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const button = document.getElementById("download-btn");
    const resume = document.getElementById("resume");

    if (!resume || !button) return; // avoid errors

    button.style.display = "none";

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(opt).from(resume).save().then(() => {
      button.style.display = "inline-block";
    });
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="form">
        <h1>RESUME BUILDER</h1>
        <h2>Fill Your Details</h2>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              rows="2"
            />
          </div>
        ))}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* ✅ Resume Preview Section */}
      <div className="preview" ref={resumeRef} id="resume">
        <h1>{formData.name}</h1>
        <p>{formData.email} | {formData.phone}</p>
        <p>{formData.address}</p>
        <hr />
        <p><strong>Summary:</strong> {formData.summary}</p>
        <p><strong>Education:</strong> {formData.education}</p>
        <p><strong>Skills:</strong> {formData.skills}</p>
        <p><strong>Experience:</strong> {formData.experience}</p>

        {/* ✅ Correct Button ID for download */}
        <button id="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default App;
