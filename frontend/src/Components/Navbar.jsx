import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";
import { FaPlaneDeparture, FaUser, FaHotel, FaPlane, FaTrain, FaBus, FaTaxi, FaUserTie, FaSuitcaseRolling, FaShieldAlt, FaSignOutAlt, FaBook, FaCog } from "react-icons/fa";
import logo from "../assets/logo/logo.png"; // Adjust the path to your logo image

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [selectedCountry, setSelectedCountry] = useState("us"); // Default to US

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    navigate("/"); // Redirect to homepage
  };

  return (
    <nav className="navbar">
 <div className="logo">
  <Link to="/">
    <img
      src={logo}
      alt="Travel Go Logo"
      className="logo-image"
    />
  </Link>
</div>



      <ul className="nav-links">
        <li><Link to="/hotels"><FaHotel className="nav-icon" /> Hotels</Link></li>
        <li><Link to="/flights"><FaPlane className="nav-icon" /> Flights</Link></li>
        <li><Link to="/train"><FaTrain className="nav-icon" /> Train</Link></li>
        <li><Link to="/bus"><FaBus className="nav-icon" /> Bus</Link></li>
        <li><Link to="/airport-transfer"><FaTaxi className="nav-icon" /> Airport Taxi</Link></li>
        <li><Link to="/tour-guide"><FaUserTie className="nav-icon" /> Tour Guide</Link></li>
        <li><Link to="/tourtravel"><FaSuitcaseRolling className="nav-icon" /> Tour Packages</Link></li>
        <li><Link to="/tourist-police"><FaShieldAlt className="nav-icon" /> Tourist Police</Link></li>
        <li><Link to="/about">About</Link></li>
        <li className="flag-dropdown">
          <div className="flag-dropdown-toggle">
            <span className={`flag-icon flag-icon-${selectedCountry}`}></span>
            <span className="flag-label"></span>
          </div>
          <ul className="flag-dropdown-menu">
            <li onClick={() => handleCountrySelect("us")}>
              <span className="flag-icon flag-icon-us"></span>
              United States
            </li>
            <li onClick={() => handleCountrySelect("uk")}>
              <span className="flag-icon flag-icon-uk"></span>
              United Kingdom
            </li>
            <li onClick={() => handleCountrySelect("ca")}>
              <span className="flag-icon flag-icon-ca"></span>
              Canada
            </li>
            <li onClick={() => handleCountrySelect("au")}>
              <span className="flag-icon flag-icon-au"></span>
              Australia
            </li>
            <li onClick={() => handleCountrySelect("in")}>
              <span className="flag-icon flag-icon-in"></span>
              India
            </li>
            <li onClick={() => handleCountrySelect("np")}>
              <span className="flag-icon flag-icon-np"></span>
              Nepal
            </li>
            <li onClick={() => handleCountrySelect("jp")}>
              <span className="flag-icon flag-icon-jp"></span>
              Japan
            </li>
            <li onClick={() => handleCountrySelect("cn")}>
              <span className="flag-icon flag-icon-cn"></span>
              China
            </li>
            <li onClick={() => handleCountrySelect("ru")}>
              <span className="flag-icon flag-icon-ru"></span>
              Russia
            </li>
            <li onClick={() => handleCountrySelect("fr")}>
              <span className="flag-icon flag-icon-fr"></span>
              France
            </li>
            <li onClick={() => handleCountrySelect("de")}>
              <span className="flag-icon flag-icon-de"></span>
              Germany
            </li>
            <li onClick={() => handleCountrySelect("th")}>
              <span className="flag-icon flag-icon-th"></span>
              Thailand
            </li>
            <li onClick={() => handleCountrySelect("id")}>
              <span className="flag-icon flag-icon-id"></span>
              Indonesia
            </li>
          </ul>
        </li>
      </ul>
      <div className="login-section">
        {isLoggedIn ? (
          <div className="dropdown">
            <div className="dropdown-toggle">
              <FaUser className="profile-icon" />
              <span>Profile</span>
            </div>
            <ul className="dropdown-menu">
              <li>
                <Link to="/user-profile">
                  <FaUser className="dropdown-icon" />
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/bookings">
                  <FaBook className="dropdown-icon" />
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <FaCog className="dropdown-icon" />
                  Settings
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link to="/login">
                  <FaSignOutAlt className="dropdown-icon" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <FaUser className="login-icon" />
            <span className="login-text"><Link to="/login">Login</Link></span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;