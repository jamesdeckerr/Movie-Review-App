import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import MovieList from '../components/MovieList';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div className="home">
      <h2>Most Popular</h2>
      <MovieList movies={movies} />

      <h2>Featured Reviews</h2>
      {/* Implement Featured Reviews */}

      <h2>Our Best Picks</h2>
      {/* Implement Our Best Picks */}
    </div>
  );
};

export default Home;
