

import React, { useState } from "react";
import banner from "../assets/Banner.png";
import { useNavigate } from "react-router-dom";

const Register= () => {
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const validate = () => {
    let temp = {};
    let isValid = true;
    if (!formData.fullname) {
      temp.fullname = "Full name required";
      isValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      temp.email = "Valid email required";
      isValid = false;
    }
    if (!formData.password || formData.password.length < 6) {
      temp.password = "Password min 6 characters";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      temp.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    setErrors(temp);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("user", JSON.stringify(formData));
      setSuccess("🎉 Registration successful! You can now login.");
    
      setFormData({ fullname: "", email: "", password: "", confirmPassword: "" });
      setErrors({}); 
       navigate("/login");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh", width: "100vw" }}
    >
      <div className="p-4 rounded text-white" style={{ backgroundColor: "rgba(0,0,0,0.6)", width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" id="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
            {errors.fullname && <small className="text-danger">{errors.fullname}</small>}
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
          <p className="mt-2 text-center">
            Already have an account? <a href="/login" className="text-info">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;