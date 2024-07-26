import React from 'react';
import { useAuth } from '../services/AuthContext';
import './Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <p>You need to log in to view your profile.</p>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <img src={user.profilePic} alt={user.username} />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Location: {user.location}</p>
      {/* Implement user reviews */}
    </div>
  );
};

export default Profile;
