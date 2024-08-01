import React, { useEffect, useState } from 'react';
import { getReviews, updateReview, deleteReview, updateUser } from '../services/api';
import { FaStar } from 'react-icons/fa';
import './Profile.css';
import '@fontsource/abril-fatface';

const Profile = () => {
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [profileData, setProfileData] = useState({
    profilePic: '',
    backgroundImg: ''
  });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getReviews().then(allReviews => {
      const userReviews = allReviews.filter(review => review.userID === user.id);
      setReviews(userReviews);
    });

    setProfileData({
      profilePic: user.profilePic || '',
      backgroundImg: user.backgroundImg || ''
    });
  }, [user.id]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    await updateUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload();
  };

  const handleEdit = (review) => {
    setEditReview(review);
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    await updateReview(editReview);
    setEditReview(null);
    getReviews().then(allReviews => {
      const userReviews = allReviews.filter(review => review.userID === user.id);
      setReviews(userReviews);
    });
  };

  const handleChangeReview = (e) => {
    setEditReview({ ...editReview, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setEditReview({ ...editReview, rating });
  };

  const handleDelete = async (reviewId) => {
    await deleteReview(reviewId);
    getReviews().then(allReviews => {
      const userReviews = allReviews.filter(review => review.userID === user.id);
      setReviews(userReviews);
    });
  };

  return (
    <div className="profile" style={{ backgroundImage: `url(${profileData.backgroundImg})` }}>
      <div className="profile-content">
        <h2>{user.username}'s Profile</h2>
        <form onSubmit={handleSaveProfile} className="edit-profile-form">
          <img src={profileData.profilePic} alt={user.username} className="profile-pic" />
          <input
            type="text"
            name="profilePic"
            placeholder="Profile Picture URL"
            value={profileData.profilePic}
            onChange={handleProfileChange}
          />
          <input
            type="text"
            name="backgroundImg"
            placeholder="Background Image URL"
            value={profileData.backgroundImg}
            onChange={handleProfileChange}
          />
          <button type="submit">Save Profile</button>
        </form>
        <div className="user-info">
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          <p>Location: {user.location}</p>
        </div>
        <h3>My Reviews</h3>
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              {editReview && editReview.id === review.id ? (
                <form onSubmit={handleSaveReview} className="edit-review-form">
                  <input
                    type="text"
                    name="movieID"
                    value={editReview.movieID}
                    onChange={handleChangeReview}
                    readOnly
                  />
                  <input
                    type="text"
                    name="moviePoster"
                    value={editReview.moviePoster}
                    onChange={handleChangeReview}
                  />
                  <textarea
                    name="reviewText"
                    value={editReview.reviewText}
                    onChange={handleChangeReview}
                  />
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        size={24}
                        color={index < editReview.rating ? "#ffc107" : "#e4e5e9"}
                        onClick={() => handleRatingChange(index + 1)}
                        style={{ cursor: "pointer", marginRight: 8 }}
                      />
                    ))}
                  </div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditReview(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  {review.moviePoster && <img src={review.moviePoster} alt={review.movieID} className="poster" />}
                  <div className="review-content">
                    <h4>{review.movieID}</h4>
                    <p>{review.reviewText}</p>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          size={24}
                          color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                          style={{ marginRight: 8 }}
                        />
                      ))}
                    </div>
                    <button onClick={() => handleEdit(review)}>Edit</button>
                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
