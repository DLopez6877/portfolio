import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThankYou from './ThankYou';
import Home from './Home';
import NotFound from './NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
