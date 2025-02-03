import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Stave, StaveNote, TickContext } from 'vexflow';

const MakeASong = () => {
  const canvasRef = useRef(null);
  const [notePosition, setNotePosition] = useState({ x: 300, y: 100 }); // Initial note position
  const [isDragging, setIsDragging] = useState(false);
  const note = useRef(null); // Using ref to store the note object

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new Renderer(canvas, Renderer.Backends.CANVAS);
    renderer.resize(700, 200);
    const context = renderer.getContext();

    // Draw the staff
    const stave = new Stave(50, 50, 600);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    // Create and draw the note if it doesn't exist
    if (!note.current) {
      note.current = new StaveNote({
        keys: ['c/4'], // Note key
        duration: 'q', // Note duration
      });
    }

    // Set the note's position
    note.current.setStave(stave);
    note.current.setContext(context);

    // Create a TickContext for the note
    const tickContext = new TickContext();
    tickContext.addTickable(note.current);
    tickContext.preFormat();

    // Draw the note
    note.current.draw();

    // Draw the note symbol at the updated position
    context.fillStyle = 'black'; // Note color
    context.font = '48px Arial'; // Set a larger font size
    context.fillText('♩', notePosition.x, notePosition.y); // Note symbol

  }, [notePosition]); // Dependency on notePosition

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const { offsetX, offsetY } = e.nativeEvent;

    // Check if the click is on the note
    if (
      offsetX >= notePosition.x - 20 && offsetX <= notePosition.x + 20 &&
      offsetY >= notePosition.y - 40 && offsetY <= notePosition.y
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const { offsetX, offsetY } = e.nativeEvent;

      // Update the note's position
      setNotePosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <h1>Draggable Note</h1>
      <canvas
        ref={canvasRef}
        width={700}
        height={200}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default MakeASong;
