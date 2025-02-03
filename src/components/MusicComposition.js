// src/components/MusicComposition.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Tone from 'tone';
import './MusicComposition.css';

const MusicComposition = () => {
    const [compositions, setCompositions] = useState([]);

    const playNote = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
    };

    useEffect(() => {
        const fetchCompositions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/compositions'); // Adjust URL as needed
                setCompositions(response.data);
            } catch (error) {
                console.error("Error fetching compositions", error);
            }
        };

        fetchCompositions();
    }, []);

    return (
        <div className="music-composition">
            <h2>Your Compositions</h2>
            <ul>
                {compositions.map(comp => (
                    <li key={comp.id}>{comp.title}</li>
                ))}
            </ul>
            <button onClick={playNote}>Play C4</button>
            {/* Add more UI for composing music */}
        </div>
    );
};

export default MusicComposition;
