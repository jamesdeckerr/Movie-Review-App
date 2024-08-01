import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/Profile';
import SubmitReview from './components/SubmitReview';
import MovieDetail from './components/MovieDetail';
import Movies from './components/Movies';
import Home from './components/Home';
import CreateMovie from './components/CreateMovie';

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/submit-review" element={<SubmitReview />} />
          <Route path="/movie/:title" element={<MovieDetail />} />
          <Route path="/all-movies" element={<Movies />} />
          <Route path="/add-new-movie" element={<CreateMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
