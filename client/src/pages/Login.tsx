import { useState } from "react";
import type { LoginFormData } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = await login(formData);
    localStorage.setItem("token", data.token);
    console.log(data);

    navigate("/dashboard");
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
        </form>
      </div>
    </div>
  );
}

export default Login;