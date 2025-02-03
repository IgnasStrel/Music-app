// src/App.js
import React from 'react';
import Header from './components/Header';
import MusicComposition from './components/MusicComposition';
import Footer from './components/Footer';
import './App.css'; // Optional: Global styles

const App = () => {
    return (
        <div className="App">
            <Header />
            <main>
                <MusicComposition />
            </main>
            <Footer />
        </div>
    );
};

export default App;
