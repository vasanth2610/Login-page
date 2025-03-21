import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", user);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Fix: Correctly initialize tsParticles
  const particlesInit = async (main) => {
    console.log("Particles Initialized");
    await loadFull(main);
  };

  return (
    <div className="position-relative vh-100 d-flex justify-content-center align-items-center">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#0d47a1" }, // Dark blue background
          particles: {
            number: { value: 100 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1.5 },
            links: { enable: true, color: "#ffffff", opacity: 0.5 },
          },
        }}
        className="position-absolute w-100 h-100"
      />

      {/* Login Form */}
      <div className="card shadow-lg p-4 position-relative" style={{ width: "350px", zIndex: 1 }}>
        <h2 className="text-center text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
