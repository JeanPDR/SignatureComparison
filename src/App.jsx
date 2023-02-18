import React, { useState } from 'react';
import UploadForm from './Pages/UploadForm';
import SignatureCanvas from './Pages/SignatureCanvas';
import Result from './Pages/Result';
import { compareSignatures } from './Pages/SignatureComparison';

function App() {
  const [images, setImages] = useState([]);
  const [score, setScore] = useState(null);

  const handleDrop = (files) => {
    setImages(files);
    setScore(null);
  };

  const handleCompare = () => {
    const score = compareSignatures(images[0], images[1]);
    setScore(score);
  };

  return (
    <div>
      <UploadForm onDrop={handleDrop} />
      {images.length === 2 && (
        <>
          <SignatureCanvas image={images[0]} />
          <SignatureCanvas image={images[1]} />
          <button onClick={handleCompare}>Comparar</button>
        </>
      )}
      {score !== null && <Result score={score} />}
    </div>
  );
}

export default App;

