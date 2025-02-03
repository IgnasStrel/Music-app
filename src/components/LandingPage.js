// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1 className="app-name">MakeM</h1>
            <div className="options">
                <button className="option-button">Make a Song</button>
                <button className="option-button">Tests</button>
                <button className="option-button">Learning</button>
            </div>
        </div>
    );
};

export default LandingPage;
