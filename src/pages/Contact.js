import React, { useState } from 'react';
import "../styles/Contact.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ContactImg from "../assets/illustrations/undraw_Contact_us_re_4qqt.png";
import { db } from "../config/Firebase"; 
import { collection, addDoc } from "firebase/firestore";
import Lottie from 'lottie-react';
import successAnimation from '../assets/Lotties/submit-success.json'; 

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
  
    try {
      const docRef = await addDoc(collection(db, "feedback"), { 
        name,
        email,
        message,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      setIsSubmitted(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  {isSubmitted && (
    <div className="lottie-container">
      <Lottie animationData={successAnimation} loop={false} />
    </div>
  )}
  

  return (
    <div className="contact-page">
      <div className="contact-form-section">
        <h1>Get the help you need.</h1>
        <p className="lead-text">Give us a few details and we’ll offer the best solution. Connect by phone, chat, email, and more.</p>
        {isSubmitted && (
  <div className="parent-container">
    <div className="lottie-container">
      <Lottie animationData={successAnimation} loop={false} />
    </div>
  </div>
)}



          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
      
      </div>
      <div className="contact-info-section">
        <img src={ContactImg} alt="Contact Us" className="support-helper-image" />
        <div className="info-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Petra University</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Sayartk03@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
