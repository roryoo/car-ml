import React from 'react';
import IMG from '../assets/aboutus.webp'; 
import '../styles/Home.css';
import "../styles/About.css";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import HowItWorks from "../pages/HowItWorks";
import AboutPage from "../pages/About";
import FaqButton  from '../components/faq-button';
import Navbar from "../components/navbar";
import ImageGrid from "../components/ImageGrid";

function LuxuryCarsShowcase() {
  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src={require("../assets/Backgroundvideo/car.mp4")} type="video/mp4" />
        </video>
      </div>

      <div className="about-header">
        <AboutPage/>
      </div> 

      <ImageGrid/>

      <div className="how-it-works-container">
        <HowItWorks />
      </div>

      <FaqButton/>
    
    </>
  );
}

export default LuxuryCarsShowcase;
