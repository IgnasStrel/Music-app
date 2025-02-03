import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Stave, StaveNote, TickContext } from 'vexflow';

const MakeASong = () => {
  const canvasRef = useRef(null);
  const [notePosition, setNotePosition] = useState({ x: 300, y: 100 }); // Natos pradinė padėtis
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    drawStaff();
  }, []);

  const drawStaff = () => {
    const canvas = canvasRef.current;
    const renderer = new Renderer(canvas, Renderer.Backends.CANVAS);
    renderer.resize(700, 200);
    const context = renderer.getContext();

    // Nupiešti penklines
    const stave = new Stave(50, 50, 600);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    // Nupiešti natą
    drawNote(context, stave);
  };

  const drawNote = (context, stave) => {
    // Sukurti natą
    const note = new StaveNote({
      keys: ['c/4'],
      duration: 'q',
    });

    // Pridėti natos TickContext
    const tickContext = new TickContext();
    tickContext.addTickable(note);
    tickContext.preFormat();
    
    // Nustatyti natų poziciją
    note.setStave(stave);
    note.setContext(context);
    note.draw();

    // Pridėti natą prie pozicijos
    context.fillStyle = 'black'; // Natos spalva
    context.font = '48px Arial'; // Nustatyti didesnį šrifto dydį
    context.fillText('♩', notePosition.x, notePosition.y); // Natos simbolis
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const { offsetX, offsetY } = e.nativeEvent;

    // Patikrinkite, ar paspaudėte ant natos
    if (
      offsetX >= notePosition.x &&
      offsetX <= notePosition.x + 40 && // Pakeistas plotis, kad atitiktų didesnį simbolį
      offsetY >= notePosition.y - 40 && // Pakeistas aukštis, kad atitiktų didesnį simbolį
      offsetY <= notePosition.y
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const { offsetX, offsetY } = e.nativeEvent;

      // Atnaujinkite natos padėtį
      setNotePosition({ x: offsetX, y: offsetY });
      drawStaff(); // Pakartotinai nupiešti, kad atnaujintumėte natos padėtį
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <h1>Vilkimų Natos</h1>
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
