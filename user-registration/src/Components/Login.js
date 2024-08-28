"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
  });
  const [genders, setGenders] = useState(["Male", "Female", "Other"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login with data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      console.log("Login response:", response.data);
      if (response.data.success) {
        alert("Login successful!");
      } else {
        alert("User not found or incorrect details.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Error logging in: " + err.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-heading">User Login</h2>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Continue
          </button>

          <p className="terms-text">You are agree to our terms and policies.</p>

          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={handleRegisterRedirect}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
