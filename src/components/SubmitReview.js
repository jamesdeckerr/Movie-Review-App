import React, { useState, useEffect } from 'react';
import { createReview, getMovies, createMovie, getReviews } from '../services/api';
import { FaStar } from 'react-icons/fa';
import './SubmitReview.css';
import { useNavigate, useLocation } from 'react-router-dom';

const SubmitReview = () => {
  const [formData, setFormData] = useState({
    movieID: '',
    moviePoster: '',
    reviewDescription: '',
    rating: 0,
  });
  const [movies, setMovies] = useState([]);
  const [isNewMovie, setIsNewMovie] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      const reviews = await getReviews();
      const reviewedMovies = reviews.map(review => ({
        title: review.movieID,
        posterURL: review.moviePoster,
      }));

      // Combine movies and reviewedMovies, filter out duplicates
      const combinedMovies = [...movies, ...reviewedMovies];
      const uniqueMovies = Array.from(new Set(combinedMovies.map(movie => movie.title)))
        .map(title => {
          return combinedMovies.find(movie => movie.title === title);
        });

      setMovies(uniqueMovies);

      // Check for pre-selected movie in URL params
      const params = new URLSearchParams(location.search);
      const preselectedMovie = params.get('movie');
      if (preselectedMovie) {
        setFormData({ ...formData, movieID: preselectedMovie });
      }
    };
    fetchData();
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }

    let moviePosterURL = formData.moviePoster;

    if (isNewMovie) {
      const newMovie = {
        title: formData.movieID,
        posterURL: formData.moviePoster,
      };
      const createdMovie = await createMovie(newMovie);
      formData.movieID = createdMovie.title;
    } else {
      const selectedMovie = movies.find(movie => movie.title === formData.movieID);
      moviePosterURL = selectedMovie ? selectedMovie.posterURL : '';
    }

    const reviewData = {
      userID: user.id,
      movieID: formData.movieID,
      moviePoster: moviePosterURL,
      rating: formData.rating,
      reviewText: formData.reviewDescription,
      datePosted: new Date().toISOString(),
    };

    await createReview(reviewData);
    navigate('/');
  };

  return (
    <div className="submit-review">
      <h2>Submit New Film</h2>
      <form onSubmit={handleSubmit}>
        <div className="movie-selection">
          <label>
            Select Existing Movie
            <input
              type="radio"
              name="movieSelection"
              value="existing"
              checked={!isNewMovie}
              onChange={() => setIsNewMovie(false)}
            />
          </label>
          <label>
            Add New Movie
            <input
              type="radio"
              name="movieSelection"
              value="new"
              checked={isNewMovie}
              onChange={() => setIsNewMovie(true)}
            />
          </label>
        </div>

        {isNewMovie ? (
          <>
            <input
              type="text"
              name="movieID"
              placeholder="New Movie Title"
              onChange={handleChange}
              value={formData.movieID}
            />
            <input
              type="text"
              name="moviePoster"
              placeholder="New Movie Poster URL"
              onChange={handleChange}
              value={formData.moviePoster}
            />
          </>
        ) : (
          <select
            name="movieID"
            onChange={handleChange}
            value={formData.movieID}
          >
            <option value="">Select Movie</option>
            {movies.map((movie, index) => (
              <option key={index} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>
        )}

        <textarea
          name="reviewDescription"
          placeholder="Review Description"
          onChange={handleChange}
          value={formData.reviewDescription}
        />
        <div className="rating">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              size={24}
              color={index < formData.rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleRatingChange(index + 1)}
              style={{ cursor: "pointer", marginRight: 8 }}
            />
          ))}
        </div>
        <button type="submit">Submit Review</button>
        <button type="button" className="delete-button">Delete Review</button>
      </form>
    </div>
  );
};

export default SubmitReview;
