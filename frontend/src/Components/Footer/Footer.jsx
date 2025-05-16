import React from "react";
import "../Footer/Footer.css";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
import payment from "../Footer/payment.svg";
import x from "../Footer/x.jpg";
import insta from "../Footer/insta.jpg";
import linked from "../Footer/linked.jpg";
import logo from "../../assets/logo/logo.png"; // ✅ Add your logo image here

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          {/* ✅ Logo Image */}
          <img src={logo} alt="TravelGo Logo" className="footer-logo" />

          <p>
            From weekend getaways to cross-country adventures, we ensure every journey is
            seamless, every plan personalized, and every trip filled with unforgettable
            moments! With trusted partners, curated experiences, and dedicated support,
            we bring comfort, convenience, and exploration right to your itinerary—
            because great travel should always be stress-free!
          </p>

          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/nishu.kunwar.31"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer-social-icons" src={insta} alt="Instagram" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhishek-kunwar55/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer-social-icons" src={linked} alt="LinkedIn" />
            </a>
            <a
              href="https://x.com/abhi__shek23"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer-social-icons" src={x} alt="X (formerly Twitter)" />
            </a>
          </div>

          <img className="payment-image" src={payment} alt="Payment methods" />
        </div>

        <div className="footer-content-center">
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to="/">Flight</Link>
            </li>
            <li>
              <Link to="/about">Train</Link>
            </li>
            <li>Hotel</li>
            <li>Tour package</li>
            <li></li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-7708520329</li>
            <li>helloishansingh@gmail.com</li>
            <li>
              TravelGo Private Limited, Bengaluru, 560103, Karnataka
            </li>
            <li>Telephone: 044-45614700</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; 2025 TravelGo – All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
