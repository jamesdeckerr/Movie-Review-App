import React from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';

const MovieList = ({ movies }) => (
  <div className="movie-list">
    {movies.map(movie => (
      <div key={movie.id} className="movie-item">
        <Link to={`/movie/${movie.id}`}>
          <img src={movie.PosterURL} alt={movie.Title} />
          <h3>{movie.Title}</h3>
        </Link>
      </div>
    ))}
  </div>
);

export default MovieList;
