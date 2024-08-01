import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovies, getReviews, getUsers } from '../services/api';
import { FaStar } from 'react-icons/fa';
import './MovieDetail.css';

const MovieDetail = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      const reviews = await getReviews();
      const users = await getUsers();
      const movie = movies.find(m => m.title === title) || {};
      const movieReviews = reviews.filter(review => review.movieID === title);

      setMovie(movie);
      setReviews(movieReviews);
      setUsers(users);
    };

    fetchData();
  }, [title]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const getUsername = (userID) => {
    const user = users.find(user => user.id === userID);
    return user ? user.username : 'Unknown';
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      {movie.posterURL && <img src={movie.posterURL} alt={movie.title} className="poster" />}
      <div className="average-rating">
        <h3>Average Rating</h3>
        <div className="rating">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              size={24}
              color={index < calculateAverageRating() ? "#ffc107" : "#e4e5e9"}
            />
          ))}
          <span>({calculateAverageRating()})</span>
        </div>
      </div>
      <Link to={`/submit-review?movie=${movie.title}`} className="new-review-link">
        <button className="new-review-button">Create New Review for {movie.title}</button>
      </Link>
      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews for this movie yet.</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      size={24}
                      color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>
                <p className="username">Posted by {getUsername(review.userID)}</p>
              </div>
              <p className="review-text">{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
