import React from 'react';
import "../styles/HowItWorks.css";

function HowItWorks() {
  return (
    <div className="container">
      <div className="header">
      <div className="container">
  <h2 className="title">How It Works</h2>
</div>

      </div>
      <div className="card">
        <h3>1. Enter Details</h3>
        <p>Start by inputting key car details</p>
      </div>
      <div className="card">
        <h3>2. Analyze Data</h3>
        <p>Click &apos;Predict&apos; to let our advanced machine learning algorithms analyze your data and calculate the estimated market price</p>
      </div>
      <div className="card">
        <h3>3. View Prediction</h3>
        <p>Review the predicted price and detailed breakdown that helps you understand the valuation</p>
      </div>

    </div>
  );
}

export default HowItWorks;
