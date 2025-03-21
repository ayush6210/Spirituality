import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './Certificate.css'; // Make sure to link the correct CSS file

const Certificate = ({ score }) => {
  const [name, setName] = useState('');
  const [collegeName, setCollegeName] = useState('');

  const handleDownload = () => {
    const doc = document.getElementById('certificate');
    // Add a class to hide the form elements
    doc.classList.add('hide-form-elements');
    html2pdf()
      .from(doc)
      .save(`${name}_Certificate_of_Achievement.pdf`)
      .then(() => {
        // Remove the class after download so the form elements are visible again
        doc.classList.remove('hide-form-elements');
      });
  };

  return (
    <div className="certificate-container">
      <div id="certificate" className="certificate">
        <div className="certificate-header">
          <h1>Certificate of Appreciation</h1>
          <p>For completing the Spirituality Based Quiz</p>
        </div>

        <div className="certificate-body">
          <p>Presented to: <span className="highlight">{name}</span></p>
          <p>Score: <span className="highlight">{score}%</span></p>
          <p>College: <span className="highlight">{collegeName}</span></p>
        </div>

        {/* Input fields and download button only visible on screen */}
        <div className="student-details">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <label>College Name:</label>
          <input 
            type="text" 
            value={collegeName} 
            onChange={(e) => setCollegeName(e.target.value)} 
            required 
          />
          <button onClick={handleDownload}>Download Certificate</button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
