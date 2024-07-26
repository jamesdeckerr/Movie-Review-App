import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routes';
import Header from './components/Header';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <RoutesConfig />
      </div>
    </Router>
  );
}

export default App;
