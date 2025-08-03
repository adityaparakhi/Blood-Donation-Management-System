import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    bloodGroup: "",
    contact: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Registration failed: " + (err.response?.data || err.message), {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "#f3f4f6", // light gray background
      }}
    >
      <ToastContainer />

      <div
        className="card shadow p-4 animate__animated animate__fadeIn"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo and heading */}
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/483/483361.png"
            alt="BloodCare"
            style={{ width: "60px", marginBottom: "10px" }}
          />
          <h3 className="fw-bold text-dark mb-1">Join BloodCare</h3>
          <p className="text-muted small">
            “One donation can save up to three lives”
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Register As</label>
            <select
              name="role"
              className="form-select form-select-lg"
              value={form.role}
              onChange={handleChange}
            >
              <option value="donor">Donor</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>

          {/* Blood Group */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              className="form-control form-control-lg"
              placeholder="e.g., A+, B-, O+"
              value={form.bloodGroup}
              onChange={handleChange}
            />
          </div>

          {/* Contact */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Contact Number</label>
            <input
              type="text"
              name="contact"
              className="form-control form-control-lg"
              placeholder="Phone number"
              value={form.contact}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-dark w-100 fw-bold py-2"
            style={{
              borderRadius: "8px",
              backgroundColor: "#212529",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#343a40")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#212529")}
          >
            Register
          </button>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <a href="/login" className="text-dark fw-semibold">
                Login
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
