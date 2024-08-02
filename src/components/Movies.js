import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, getReviews } from '../services/api';
import { FaStar } from 'react-icons/fa';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      const reviews = await getReviews();
      const reviewedMovies = reviews.map(review => ({
        title: review.movieID,
        posterURL: review.moviePoster,
      }));

      const combinedMovies = [...movies, ...reviewedMovies];
      const uniqueMovies = Array.from(new Set(combinedMovies.map(movie => movie.title)))
        .map(title => {
          return combinedMovies.find(movie => movie.title === title);
        });

      setMovies(uniqueMovies);
      setReviews(reviews);
    };
    fetchData();
  }, []);

  const calculateAverageRating = (movieTitle) => {
    const movieReviews = reviews.filter(review => review.movieID === movieTitle);
    if (movieReviews.length === 0) return 0;
    const totalRating = movieReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / movieReviews.length).toFixed(1);
  };

  return (
    <div className="movies">
      <h2>All Movies</h2>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <Link to={`/movie/${movie.title}`}>
              <img src={movie.posterURL} alt={movie.title} className="poster" />
              <h3>{movie.title}</h3>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    size={24}
                    color={index < calculateAverageRating(movie.title) ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
                <span className="average-rating">({calculateAverageRating(movie.title)})</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
