import React, { useState } from 'react';
import { createReview } from '../services/api';
import './ReviewForm.css';

const ReviewForm = ({ movieId }) => {
  const [formData, setFormData] = useState({
    userID: '',
    movieID: movieId,
    rating: '',
    reviewText: '',
    datePosted: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(formData);
    // Redirect or update UI after successful submission
  };

  return (
    <div className="review-form">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleChange} value={formData.rating} />
        <textarea name="reviewText" placeholder="Write your review" onChange={handleChange} value={formData.reviewText}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
