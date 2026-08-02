import { useState } from "react";
import type { AuthFormData } from "../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "./Login.css";

function Register() {
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
            await register(formData);

            navigate("/login");
        } catch (error) {
            setError("Registration failed");
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Create Account</h1>

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
                        Register
                    </button>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}
                </form>
                <div className="auth-link">
                    <p>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;