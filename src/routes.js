import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import SubmitReview from './components/SubmitReview';
import CreateMovie from './components/CreateMovie';
import Movies from './components/Movies';
import PrivateRoute from './components/PrivateRoute';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/movie/:title" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    <Route path="/submit-review" element={<PrivateRoute><SubmitReview /></PrivateRoute>} />
    <Route path="/create-movie" element={<PrivateRoute><CreateMovie /></PrivateRoute>} />
    <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default RoutesConfig;
