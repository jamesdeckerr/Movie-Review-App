import React, { useState } from 'react';
import { createMovie } from '../services/api';
import './CreateMovie.css';
import { useNavigate } from 'react-router-dom';

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    posterURL: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMovie(formData);
    navigate('/all-movies');
  };

  return (
    <div className="create-movie">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          type="text"
          name="posterURL"
          placeholder="Movie Poster URL"
          onChange={handleChange}
          value={formData.posterURL}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default CreateMovie;
