import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture, FaSignOutAlt } from "react-icons/fa";
import "./user.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token);

      if (!token) {
        setError("No authentication token found. Please log in.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API response:", response.data);
        setUserData(response.data);
        setIsLoading(false);
        setShowNotification(true);
      } catch (err) {
        console.error("Fetch error:", err.response || err);
        const errorMessage =
          err.response?.data?.message ||
          "Failed to fetch user data. Please try again.";
        setError(errorMessage);
        setIsLoading(false);
        if (err.response?.status === 401) {
          console.log("Unauthorized - clearing token");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getProfileCompletion = () => {
    if (!userData) return 0;
    const fields = ["name", "email", "phone", "age", "address"];
    const filled = fields.filter((field) => userData[field]).length;
    return Math.round((filled / fields.length) * 100);
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard">
      {showNotification && userData && (
        <div className="notification">
          <div className="notification-content">
            <FaPlaneDeparture className="notification-icon" />
            <p>{`${getGreeting()}, ${userData.name || "User"}!`}</p>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="popup-overlay">
          <div className="popup">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => navigate("/login")} className="error-btn">
            Back to Login
          </button>
        </div>
      ) : userData ? (
        <div className="dashboard-wrapper">
          <aside className="sidebar">
            <div className="profile-header">
              <div className="avatar">{getInitials(userData.name)}</div>
              <div>
                <h1 className="profile-title">{userData.name || "User"}</h1>
              </div>
            </div>
            <nav className="sidebar-nav">
              <button className="nav-link active">Your Profile</button>
              <button
                className="nav-link"
                onClick={() => navigate("/hotel-booking")}
              >
                Hotel
              </button>
              <button
                className="nav-link"
                onClick={() => alert("Settings page not implemented")}
              >
                Flight
              </button>
              <button
                className="nav-link"
                onClick={() => alert("Settings page not implemented")}
              >
                Train
              </button>
              <button
                className="nav-link"
                onClick={() => alert("Settings page not implemented")}
              >
                TourPackage
              </button>
              <button
                className="nav-link"
                onClick={() => alert("Settings page not implemented")}
              >
                TourGuide
              </button>
              <button
                className="nav-link"
                onClick={() => alert("Settings page not implemented")}
              >
                Payment
              </button>
             
            </nav>
          </aside>
          <main className="dashboard-content">
            <div className="welcome-message">
              <p>Your profile is {getProfileCompletion()}% complete.</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${getProfileCompletion()}%` }}
                ></div>
              </div>
            </div>
            <div className="profile-details">
              <h2 className="details-title">Your Profile</h2>
              <div className="details-card">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="label">Email</p>
                  <p className="value">{userData.email || "N/A"}</p>
                </div>
              </div>
              <div className="details-card">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="label">Phone</p>
                  <p className="value">{userData.phone || "N/A"}</p>
                </div>
              </div>
              <div className="details-card">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="label">Age</p>
                  <p className="value">{userData.age || "N/A"}</p>
                </div>
              </div>
              <div className="details-card">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="label">Address</p>
                  <p className="value">{userData.address || "N/A"}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="error-container">
          <p className="error-message">No user data available</p>
          <button onClick={() => navigate("/login")} className="error-btn">
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;