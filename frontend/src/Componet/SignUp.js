

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateForm = () => {
   // <ToastContainer position="top-right" autoClose={3000} />;
    let newErrors = {};

    // Full Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required!";
    } else if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) {
      newErrors.name = "Full Name must be at least 3 letters ";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (!/^(?=.*[A-Z]).{3,}$/.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters and include one uppercase letter! ";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required!";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:200/SignUp",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Success Response:", response.data); // ✅ Debugging
      toast.success(response.data.message || "Registration successful!");
      localStorage.setItem('token',response.data.token)

      setTimeout(() => {
        navigate("/login"); // ✅ Ensure navigation works after toast
      }, 1000); // Delaying navigation so the toast is visible
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-container p-5 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your full name"
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Create a strong password"
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>

          <p className="text-center mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
