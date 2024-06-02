import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import faqAnimation from '../assets/Lotties/Faq-button.json';
import "../styles/faq-button.css";

function FaqButton() {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleFaqClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/faq');
    }, 2000); 
  };

  return (
    <div onClick={handleFaqClick} className="faq-button-container">
      <button className="faq-button">
        <div className="faq-icon">❓</div>
        <div>Common Questions</div>
        <div className="faq-line"></div>
      </button>
      {isAnimating && (
        <div className="animation-container">
          <Lottie 
            animationData={faqAnimation} 
            loop={true} 
            style={{ width: '200px', height: '200px' }} // Adjust the size as needed
          />
        </div>
      )}
    </div>
  );
}

export default FaqButton;
