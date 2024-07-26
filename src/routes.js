import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './components/MovieDetail';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/movie/:id" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default RoutesConfig;
