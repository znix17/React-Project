import React from "react";
import "./Footer.css";
import Logo from "../../assets/logo-white.png";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img className="footer-logo" src={Logo} alt="logo-footer"></img>
        <div className="footer-site-map">
          <p className="footer-title"> SITEMAP</p>
          <Link className="footer-item" to="/">Home</Link>
          <Link className="footer-item" to="/about">About</Link>
          <Link className="footer-item" to="/menu">Menu</Link>
          <Link className="footer-item" to="/reservations">Reservations</Link>
          <Link className="footer-item" to="/orders">Order Online</Link>
          <Link className="footer-item" to="/login">Login</Link>
        </div>
        <div className="footer-contact">
          <p className="footer-title"> CONTACT</p>
          <p className="footer-item"> 123 Citrus Lane</p>
          <p className="footer-item"> 123-456-7890</p>
          <p className="footer-item"> little.lemon@lemon.com</p>
        </div>
        <div className="footer-social">
          <p className="footer-title"> SOCIAL MEDIA</p>
          <div className="social-icons">
            <a className="social-icon" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34v7.03C18.34 21.25 22 17.09 22 12.07z"/>
              </svg>
            </a>

            <a className="social-icon" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.3A4.7 4.7 0 1 0 16.7 13 4.7 4.7 0 0 0 12 8.3zm6.4-3.6a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z"/>
                <circle cx="12" cy="13" r="2.7"/>
              </svg>
            </a>

            <a className="social-icon" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 5.92c-.64.28-1.33.47-2.05.55a3.6 3.6 0 0 0 1.57-1.98 7.2 7.2 0 0 1-2.29.88 3.6 3.6 0 0 0-6.13 3.28A10.2 10.2 0 0 1 3.16 4.6a3.6 3.6 0 0 0 1.12 4.8c-.53 0-1.03-.16-1.46-.4v.04a3.6 3.6 0 0 0 2.89 3.53c-.47.13-.97.2-1.48.08.42 1.36 1.64 2.36 3.08 2.39A7.23 7.23 0 0 1 2 19.54a10.2 10.2 0 0 0 5.52 1.62c6.62 0 10.24-5.49 10.24-10.25v-.47c.7-.5 1.3-1.12 1.78-1.83-.65.29-1.34.49-2.06.57z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
