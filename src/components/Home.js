import React, { useEffect, useState } from 'react';
import { getMovies, getReviews } from '../services/api';
import MovieList from './MovieList';
import { FaStar } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
    getReviews().then(setReviews);
  }, []);

  return (
    <div className="home">
      <h2>Most Popular</h2>
      <MovieList movies={movies} />

      <h2>Recent Reviews</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
