import { useState } from "react";
import type { AuthFormData } from "../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";
import "./Login.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AuthFormData>({
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

        try {
            await register(formData);
            toast.success("Account created successfully.");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to register user.");
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