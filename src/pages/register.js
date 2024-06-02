import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../styles/register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3600/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log("User signed up successfully:", data);
      setSuccessMessage("User signed up successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      // setErrorMessage("");
    }  catch (error) {
      console.error("Error signing up:", error.message);
      setSuccessMessage("");
    }
  };

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed up with Google successfully");
      setSuccessMessage("User signed up with Google successfully!");
    } catch (error) {
      console.error("Error signing up with Google:", error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        <div className="form-container">
          <h2>Create a New Account</h2>
          <form onSubmit={signUp}>
            <div className="input-container">
              <div className="icon-wrapper">
                <i className="fas fa-user icon"></i>
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <div className="icon-wrapper">
                <i className="fas fa-envelope icon"></i>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <div className="icon-wrapper">
                <i className="fas fa-key icon"></i>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">SIGN UP</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="links">
              <span>Already have an account? </span>
              <Link to="/login" className="login-link">Login here</Link>
            </div>
          </form>
        </div>
        <div className="image-container">
          <img src="https://cdn.dribbble.com/users/1292088/screenshots/14802334/media/c048a0db9c48636f9a56ae5bca7d5637.jpg?resize=1200x900&vertical=center" alt="Register Visual" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
