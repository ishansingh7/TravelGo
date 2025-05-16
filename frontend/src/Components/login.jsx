import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setAddress("");
    setPassword("");
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = { name, email, phone, age, address, password };
    console.log("Signup data:", userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsLoading(false);
      resetForm();
      navigate("/user-profile");
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.message || "Signup failed");
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = { email, password };
    console.log("Login data:", userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data.message);
      localStorage.setItem("token", response.data.token);
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        navigate("/user-profile");
      }, 2000);
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {error && <p className="error-message">{error}</p>}

        {isSignup ? (
          <div>
            <h1 className="auth-title">Create Account</h1>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
              <button type="submit" className="auth-btn" disabled={isLoading}>
                {isLoading ? "Registering..." : "Sign Up"}
              </button>
            </form>
            <p className="toggle-text">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsSignup(false);
                  setError("");
                }}
                className="toggle-link"
              >
                Login
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h1 className="auth-title">Welcome Back</h1>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
              <button type="submit" className="auth-btn" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="toggle-text">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsSignup(true);
                  setError("");
                }}
                className="toggle-link"
              >
                Sign Up
              </span>
            </p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="spinner"></div>
            <p>{isSignup ? "Registering..." : "Logging in..."}</p>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup success">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle className="checkmark-circle" cx="26" cy="26" r="25" />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <p>Login Successful!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;