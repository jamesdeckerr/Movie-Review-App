import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">Movie Review App</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/submit-review">Submit New Review</Link>
        <Link to="/add-new-movie">Add New Movie</Link>
        <Link to="/all-movies">View All Movies</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
