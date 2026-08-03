import { useState } from "react";
import type { AuthFormData } from "../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const data = await login(formData);

      localStorage.setItem("token", data.token);

      toast.success("Welcome back!");

      navigate("/dashboard");

    } catch (error) {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Job Tracker</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="auth-link">
          <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;