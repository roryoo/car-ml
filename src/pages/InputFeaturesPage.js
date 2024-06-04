import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Lotties/car.json';
import { FaBolt, FaGasPump, FaLeaf } from 'react-icons/fa';
import '../styles/inputFeatures.css';

function CarPricePredictionForm() {
  const [isLottieVisible, setIsLottieVisible] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  function showAnimation() {
    setIsLottieVisible(true);
    setTimeout(() => {
      setIsLottieVisible(false);
      window.open("https://stramlit-carpricepredictionsystemlast.streamlit.app/", "_blank");
    }, 3000);
  }

  return (
    <>
      {!isLottieVisible && (
        <div id="car-selection">
          <div className="car-box-row">
            <div className="car-box" onClick={() => showAnimation()}>
              <FaBolt className="car-icon" />
              <h2>Electric</h2>
            </div>
            <div className="car-box" onClick={() => showAnimation()}>
              <FaGasPump className="car-icon" />
              <h2>Fuel</h2>
            </div>
            <div className="car-box" onClick={() => showAnimation()}>
              <FaLeaf className="car-icon" />
              <h2>Hybrid</h2>
            </div>
          </div>
        </div>
      )}

      {isLottieVisible && (
        <div className="lottie-container">
          <Lottie options={defaultOptions} height={200} width={200} speed={2} />
        </div>
      )}
    </>
  );
}

export default CarPricePredictionForm;
