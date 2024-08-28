import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    password: "",
    gender: "",
    about: "",
  });
  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setGenders(["Male", "Female", "Other"]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      alert("User registered successfully!");
      setFormData({
        name: "",
        age: "",
        dateOfBirth: "",
        password: "",
        gender: "",
        about: "",
      });
    } catch (err) {
      alert("Error registering user: " + err.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="register-heading">User Registration</h2>

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
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min={0}
              max={120}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={10}
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

          <div className="form-group">
            <label htmlFor="about">About:</label>
            <textarea
              className="form-control"
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              maxLength={5000}
              rows={4}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>

        <p className="terms-text">
          You are agree to our <a href="/terms">terms and policies</a>.
        </p>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={handleLoginRedirect}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
