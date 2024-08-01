import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Movie Review App</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/submit-review">Submit New Review</Link>
        <Link to="/add-new-movie">Add New Movie</Link>
        <Link to="/all-movies">View All Movies</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-button">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
