import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Login = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Replace with actual login API call
            await axios.post('http://127.0.0.1:8000/Account/Userlogin/', { username, password });
            alert('Login successful');
            navigate('/')
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Signup</h1>
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
                            id="password2"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="login-btn m-5">Login</button>
                        <a href='/Signup'>Don't have an Account ? Create One</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
