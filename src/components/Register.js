import React, { useState } from 'react';
import { createUser } from '../services/api';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    profilePic: '',
    age: '',
    gender: '',
    location: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser(formData);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <input type="text" name="profilePic" placeholder="Profile Picture URL" onChange={handleChange} value={formData.profilePic} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} value={formData.gender} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} value={formData.location} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
