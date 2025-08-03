import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { login } from "../utils/auth";

const Login = ({ setRole }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const { token, role } = res.data;

      login(token, role);
      localStorage.setItem("email", form.email);
      setRole(role.toUpperCase());

      if (role === "donor") navigate("/donor");
      else if (role === "receiver") navigate("/receiver");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#f3f4f6", // light gray background
      }}
    >
      <div
        className="card shadow p-4 animate__animated animate__fadeIn"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/483/483361.png"
            alt="BloodCare Logo"
            style={{ width: "60px", marginBottom: "10px" }}
          />
          <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
          <p className="text-muted small">
            Login to continue saving lives with BloodCare
          </p>
        </div>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleLogin}>
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
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold py-2"
            style={{
              borderRadius: "8px",
              backgroundColor: "#212529",
              color: "#fff",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#343a40")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#212529")}
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <a href="/register" className="text-dark fw-semibold">
              Register here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
