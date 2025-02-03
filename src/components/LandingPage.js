// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate(); // Get the navigate function

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className="landing-page">
            <h1 className="app-name">MakeM</h1>
            <div className="options">
                <button className="option-button" onClick={() => handleNavigation('/make-a-song')}>Make a Song</button>
                <button className="option-button" onClick={() => handleNavigation('/tests')}>Tests</button>
                <button className="option-button" onClick={() => handleNavigation('/learning')}>Learning</button>
            </div>
        </div>
    );
};

export default LandingPage;
