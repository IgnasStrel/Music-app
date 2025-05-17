import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

const MakeASong = () => {
  const containerRef = useRef(null);
  const [notePositions, setNotePositions] = useState([
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 250, y: 50 },
    { x: 350, y: 50 },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingNoteIndex, setDraggingNoteIndex] = useState(null);
  const noteRefs = useRef([]);

  // Render notation
  const renderNotation = () => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = ''; // Clear previous rendering

    // Create VexFlow renderer
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(700, 200);
    const context = renderer.getContext();

    // Draw staff (clef and time signature)
    const stave = new Stave(50, 50, 600);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    // Create notes
    const notes = [
      new StaveNote({ keys: ['c/4'], duration: 'q' }),
      new StaveNote({ keys: ['d/4'], duration: 'q' }),
      new StaveNote({ keys: ['e/4'], duration: 'q' }),
      new StaveNote({ keys: ['f/4'], duration: 'q' }),
    ];

    // Create a voice and add notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickable(notes[0]);
    voice.addTickable(notes[1]);
    voice.addTickable(notes[2]);
    voice.addTickable(notes[3]);

    // Create formatter to format the notes
    new Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);

    // Select all note elements
    const svg = containerRef.current.querySelector('svg');
    const noteElements = svg.querySelectorAll('.vf-stavenote');

    // For each note element, set initial position and handle dragging
    noteElements.forEach((noteElement, index) => {
      const { x, y } = notePositions[index];

      // Apply translation (move note to the correct position)
      noteElement.setAttribute('transform', `translate(${x}, ${y})`);

      // Add mouse down event for dragging
      noteElement.style.cursor = 'grab';
      noteElement.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Stop other events
        setIsDragging(true);
        setDraggingNoteIndex(index); // Track which note is being dragged
      });

      // Save note ref for later use
      noteRefs.current[index] = noteElement;
    });
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || draggingNoteIndex === null) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate the new mouse position inside the container
      let x = e.clientX - containerRect.left;
      let y = e.clientY - containerRect.top;

      // Ensure that the note's Y position doesn't drop below the initial position
      // We keep the Y position fixed at minimum as the start position, only allow movement along X
      const updatedY = 50; // Fixed Y position so note doesn't fall down

      // Update the position of the dragged note
      const updatedPositions = [...notePositions];
      updatedPositions[draggingNoteIndex] = { x, y: updatedY };

      setNotePositions(updatedPositions); // Update state with new positions
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false); // Stop dragging
    };

    // Attach the mousemove and mouseup event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Clean up event listeners when the component is unmounted
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggingNoteIndex, notePositions]); // Re-run when position changes

  // Render the musical notation and handle dragging
  useEffect(() => {
    renderNotation(); // Re-render notation each time note positions change
  }, [notePositions]); // Run when notePositions are updated

  return (
    <div style={{ justifyItems: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Drag the note 🎵</h1>
      <div
        ref={containerRef}
        style={{
          width: '700px',
          height: '500px',
          border: '1px solid black',
          userSelect: 'none',
        }}
      ></div>
    </div>
  );
};

export default MakeASong;
