import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {

    const [currentImage, setCurrentImage] = React.useState(0);
    const [fade, setFade] = React.useState(true);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [darkMode, setDarkMode] = React.useState(false);
    const navigate = useNavigate();

    const images = [
        "/images/bg1.jpg",
        "/images/bg2.jpg",
        "/images/bg3.jpg",
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
                setFade(true); 
            }, 500); 
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (username === "admin" && password === "password") {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid username or password.")
        }
    }

    return (
        <div className={`login-page ${darkMode ? "dark" : "light"}`}>
            <div
                className={`background-slideshow ${fade ? "fade-in" : "fade-out"}`}
                style={{ backgroundImage: `url(${images[currentImage]})` }}
            />

            <div className="toggle-container">
                <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "Turn Light On" : "Turn Light Off"}
                </button>
            </div>


            <div className="login-modal">
                <h2>Login</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setError("");
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("");
                        }}
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>

                <div className="divider">or</div>

                <button className="oauth-btn" onClick={() => alert("Login with Google")}>
                    Login with Google
                </button>
                <button className="oauth-btn" onClick={() => alert("Login with GitHub")}>
                    Login with GitHub
                </button>
            </div>
        </div>
    )
}

export default LoginPage;