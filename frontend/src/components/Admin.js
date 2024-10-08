import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import `Link` for navigation
import axios from "axios";
import '../media/css/Login.css'; // Assuming your CSS file is set up

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/Account/Admin_Login/", {
        username,
        password,
      });

      if (response.data.is_staff) {
        setIsLoggedIn(true); // Set login status
      } else {
        setError("You don't have permission to access the admin panel.");
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  const linkStyle = {
    margin: '10px',
    textDecoration: 'none',
    color: 'blue',
    fontSize: '18px',
  };

  // If user is logged in, show the admin panel links
  if (isLoggedIn) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to the Admin Panel</h1>
        <div style={{ marginTop: '30px' }}>
          <Link to="/view-crime-records" style={linkStyle}> View All Crime records</Link>
          <Link to="/register-crime" style={linkStyle}>Register Crime Report</Link>
        </div>
      </div>
    );
  }

  // If not logged in, show the login form
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Login</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>
        <form onSubmit={handleLogin}>
          <div id='form'>
            <label htmlFor="username">Username :</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password :</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>
        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
}
