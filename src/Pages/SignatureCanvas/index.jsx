import React, { useRef, useEffect } from 'react';

function SignatureCanvas({ image }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = URL.createObjectURL(image);
  }, [image]);

  return <canvas ref={canvasRef} />;
}

export default SignatureCanvas;