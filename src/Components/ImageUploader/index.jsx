import React, { useState } from "react";

function ImageUploader() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImage1Change = (e) => {
    setImage1(URL.createObjectURL(e.target.files[0]));
  };

  const handleImage2Change = (e) => {
    setImage2(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <h2>Carregar imagens:</h2>
      <div>
        <label htmlFor="image1">Imagem 1:</label>
        <input type="file" id="image1" onChange={handleImage1Change} />
      </div>
      <div>
        <label htmlFor="image2">Imagem 2:</label>
        <input type="file" id="image2" onChange={handleImage2Change} />
      </div>
    </div>
  );
}

export default ImageUploader;