// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import LandingPage from './components/LandingPage'; 
import './App.css'; // Global styles
import MakeASong from './components/MakeASong';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/make-a-song" element={<MakeASong />} />
                    {/* Add routes for Tests and Learning here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
