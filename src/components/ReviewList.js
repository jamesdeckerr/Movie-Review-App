import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews }) => (
  <div className="review-list">
    {reviews.map(review => (
      <div key={review.id} className="review-item">
        <h4>Rating: {review.Rating}</h4>
        <p>{review.ReviewText}</p>
        <small>Posted on: {new Date(review.DatePosted).toLocaleDateString()}</small>
      </div>
    ))}
  </div>
);

export default ReviewList;
