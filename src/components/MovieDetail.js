import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovies, getReviews } from '../services/api';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovies().then(movies => setMovie(movies.find(movie => movie.id === parseInt(id))));
    getReviews().then(reviews => setReviews(reviews.filter(review => review.MovieID === parseInt(id))));
  }, [id]);

  return (
    <div className="movie-detail">
      <img src={movie.PosterURL} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <ReviewForm movieId={movie.id} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default MovieDetail;
