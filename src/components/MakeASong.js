import React, { useEffect, useRef } from 'react';
import { Renderer, Stave } from 'vexflow';

const MakeASong = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawStaff();
  }, []);

  const drawStaff = () => {
    // Gauti kanvės elementą
    const canvas = canvasRef.current;

    // Sukurti rendererį
    const renderer = new Renderer(canvas, Renderer.Backends.CANVAS);
    renderer.resize(700, 200);
    
    // Gauti kontekstą
    const context = renderer.getContext();

    // Sukurti penklines
    const stave = new Stave(50, 50, 600);
    stave.addClef('treble').addTimeSignature('4/4');
    
    // Nustatyti kontekstą ir nupiešti penklines
    stave.setContext(context).draw();
  };

  return (
    <div>
      <h1>Penklinės</h1>
      <canvas ref={canvasRef} width={700} height={200}></canvas>
    </div>
  );
};

export default MakeASong;
