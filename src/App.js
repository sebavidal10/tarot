import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Spread from './components/Spread/Spread';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Spread />} />
    </Routes>
  </Router>
);

export default App;
