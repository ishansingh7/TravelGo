import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHotel, FaTrash, FaExclamationCircle } from "react-icons/fa";
import "./HotelBookings.css";

const HotelBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        // Fetch user data to get email
        const userResponse = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("User data:", userResponse.data); // Log user data
        setUserData(userResponse.data);

        if (!userResponse.data.email) {
          throw new Error("User email not found in response");
        }

        // Fetch bookings using user's email
        const bookingsResponse = await axios.get(
          `http://localhost:5000/api/bookings/email/${encodeURIComponent(userResponse.data.email)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Bookings response:", bookingsResponse.data); // Log bookings
        setBookings(bookingsResponse.data);
        setIsLoading(false);
        setShowNotification(true);
      } catch (err) {
        console.error("Fetch error:", err.response || err);
        const errorMessage =
          err.response?.data?.error ||
          err.message ||
          "Failed to fetch bookings. Please try again.";
        setError(errorMessage);
        setIsLoading(false);
        if (err.response?.status === 401) {
          console.log("Unauthorized - clearing token");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserAndBookings();
  }, [navigate]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      setShowNotification(true);
    } catch (err) {
      console.error("Delete booking error:", err.response || err);
      const errorMessage =
        err.response?.data?.error ||
        "Failed to cancel booking. Please try again.";
      setError(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard">
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <FaHotel className="notification-icon" />
            <p>{bookings.length > 0 ? "Bookings loaded!" : "Action completed!"}</p>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="popup-overlay">
          <div className="popup">
            <div className="spinner"></div>
            <p>Loading bookings...</p>
          </div>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => navigate("/login")} className="error-btn">
            Back to Login
          </button>
        </div>
      ) : bookings.length > 0 ? (
        <div className="dashboard-wrapper">
          <aside className="sidebar">
            <div className="profile-header">
              <div className="avatar">HB</div>
              <div>
                <h1 className="profile-title">Hotel Bookings</h1>
              </div>
            </div>
            <nav className="sidebar-nav">
              <button className="nav-link" onClick={() => navigate("/profile")}>
                Your Profile
              </button>
              <button className="nav-link active">Hotel Bookings</button>
              <button className="nav-link" onClick={() => alert("Flight page not implemented")}>
                Flight
              </button>
              <button className="nav-link" onClick={() => alert("Train page not implemented")}>
                Train
              </button>
              <button className="nav-link" onClick={() => alert("TourPackage page not implemented")}>
                TourPackage
              </button>
              <button className="nav-link" onClick={() => alert("TourGuide page not implemented")}>
                TourGuide
              </button>
              <button className="nav-link" onClick={() => alert("Payment page not implemented")}>
                Payment
              </button>
            </nav>
          </aside>
          <main className="dashboard-content">
            <div className="welcome-message">
              <p>You have {bookings.length} hotel booking(s).</p>
            </div>
            <div className="bookings-details">
              <h2 className="details-title">Your Hotel Bookings</h2>
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <div className="booking-info">
                    <FaHotel className="icon" />
                    <div>
                      <p className="label">Hotel Name</p>
                      <p className="value">{booking.hotelName || "N/A"}</p>
                    </div>
                  </div>
                  <div className="booking-info">
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
                      <p className="label">Location</p>
                      <p className="value">{booking.hotelLocation || "N/A"}</p>
                    </div>
                  </div>
                  <div className="booking-info">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="label">Check-in Date</p>
                      <p className="value">{formatDate(booking.bookingCheckIn)}</p>
                    </div>
                  </div>
                  <div className="booking-info">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="label">Check-out Date</p>
                      <p className="value">{formatDate(booking.bookingCheckOut)}</p>
                    </div>
                  </div>
                  <div className="booking-info">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <p className="label">Total Cost</p>
                      <p className="value">${booking.totalCost?.toFixed(2) || "N/A"}</p>
                    </div>
                  </div>
                  <div className="booking-info">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div>
                      <p className="label">Guests</p>
                      <p className="value">{booking.bookingGuests || "N/A"}</p>
                    </div>
                  </div>
                  <div className="booking-info">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <p className="label">Payment Status</p>
                      <p className="value">{booking.paymentStatus || "N/A"}</p>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteBooking(booking._id)}
                  >
                    <FaTrash />
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="error-container">
          <p className="error-message">No hotel bookings found.</p>
          <button onClick={() => navigate("/")} className="error-btn">
            Book a Hotel
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelBookings;