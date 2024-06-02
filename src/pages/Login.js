import React, { useState } from 'react';
import "../styles/Login.css";
import { Link } from 'react-router-dom';
import { auth, googleProvider } from "../config/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signIn = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3600/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
  
      const data = await response.json();
      console.log("User logged in successfully:", data);
      const usernameFromEmail = email.split('@')[0];
      setUsername(usernameFromEmail);
      setShowWelcomePopup(true);
      setSuccessMessage("User logged in successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setSuccessMessage("");
    }
  };
  

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User logged in successfully");
      setSuccessMessage("User logged in with Google successfully!");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setSuccessMessage("");
    }
  };

  const handleCreateAccountClick = () => {
    setShowAnimation(true);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="form-container">
          <h2>Login to your Account</h2>
          <form onSubmit={signIn}>
            <div className="input-container">
              <div className="icon-wrapper">
                <i className="fas fa-user icon"></i>
              </div>
              <input
                type="text"
                placeholder="Username or email"
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
            <button type="submit">LOGIN</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="links">
              <span>Not Registered? </span>
              <Link to="/register" className="create-account" onClick={handleCreateAccountClick}>
                Create an Account
              </Link>
            </div>
            <div className="separator">
              <span></span>
              <p>or</p>
              <span></span>
            </div>
            <div className="social-login">
              <button className="google" onClick={signInWithGoogle}>
                <i className="fab fa-google"></i> Sign in with Google
              </button>
            </div>
          </form>
        </div>
        <div className="image-container">
          <img src="https://cdn.dribbble.com/users/1292088/screenshots/14802334/media/c048a0db9c48636f9a56ae5bca7d5637.jpg?resize=1200x900&vertical=center" alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
