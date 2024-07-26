import React, { useState } from 'react';
import { loginUser } from '../services/api';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(credentials);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={credentials.username} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={credentials.password} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
