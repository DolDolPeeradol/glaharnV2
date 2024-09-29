// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home'; // Import your Home component
import CheckBill from './components/Checkbill'; // Import your CheckBill component
import Summary from './components/Summary'; // Import your Summary component
import StatusDebtor from './components/StatusDebtor'; // Import your StatusDebtor component
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkbill" element={<CheckBill />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/statusdebtor" element={<StatusDebtor />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
