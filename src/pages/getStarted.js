import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GetStarted.css';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/InputFeaturesPage');
  };

  return (
    <div className="get-started-container">
      <h1 className="get-started-title">Welcome to Sayartk!</h1>
      <p className="get-started-description">
        Ready to find out how much your car is worth? Let&apos;s get started by choosing your car type.
      </p>
      <button className="get-started-button" onClick={handleClick}>Get Started</button>
    </div>
  );
};

export default GetStarted;
