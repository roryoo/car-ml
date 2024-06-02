import React, { useState, useEffect } from 'react';
import Logo from "../assets/image 1-fotor-bg-remover-202404013208.png";
import { Link, useLocation } from 'react-router-dom';
import "../styles/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faSignOutAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
 
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
 
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
 
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
 
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <Link to="/">
          <img src={Logo} alt="Car Wash Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className={`nav-links-container ${scrolled ? 'scrolled' : ''}`}>
        <Link className={`nav-link ${activeLink === '/' ? 'active' : ''}`} to="/" onClick={() => handleLinkClick('/')}>
          Home
        </Link>
        <Link className={`nav-link ${activeLink === '/GetStarted' ? 'active' : ''}`} to="/GetStarted" onClick={() => handleLinkClick('/GetStarted')}>
          Prediction
        </Link>
        <Link className={`nav-link ${activeLink === '/contact' ? 'active' : ''}`} to="/contact" onClick={() => handleLinkClick('/contact')}>
          Contact
        </Link>
        <Link className={`nav-link ${activeLink === '/login' ? 'active' : ''}`} to="/login" onClick={() => handleLinkClick('/login')}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
        {/* Toggle Button at the right */}
        <div className="dropdown">
          <button className="nav-link dropdown-toggle" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/history">
                <FontAwesomeIcon icon={faHistory} /> History
              </Link>
              <button className="dropdown-item" onClick={() => {}}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;
 
