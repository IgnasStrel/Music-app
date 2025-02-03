// src/App.js
import React from 'react';
import Header from './components/Header'; // Optional, you can remove Header for the landing page
import LandingPage from './components/LandingPage'; // Import the new LandingPage component
import Footer from './components/Footer'; // Optional, you can remove Footer for the landing page
import './App.css'; // Optional: Global styles

const App = () => {
    return (
        <div className="App">
            <LandingPage /> {/* Use the LandingPage component */}
            {/* If you want to include Header and Footer, uncomment the lines below */}
            {/* <Header /> */}
            {/* <main> */}
            {/*     <MusicComposition /> */}
            {/* </main> */}
            {/* <Footer /> */}
        </div>
    );
};

export default App;
