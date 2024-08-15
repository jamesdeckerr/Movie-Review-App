import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/Profile';
import SubmitReview from './components/SubmitReview';
import MovieDetail from './components/MovieDetail';
import Movies from './components/Movies';
import Home from './components/Home';
import CreateMovie from './components/CreateMovie';
import Login from './components/Login';
import Register from './components/Register'; 
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './services/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Add the Register route */}
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/submit-review" element={
              <PrivateRoute>
                <SubmitReview />
              </PrivateRoute>
            } />
            <Route path="/movie/:title" element={<MovieDetail />} />
            <Route path="/all-movies" element={<Movies />} />
            <Route path="/add-new-movie" element={
              <PrivateRoute>
                <CreateMovie />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
