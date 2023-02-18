import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function UploadForm({ onDrop }) {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    onDrop(acceptedFiles);
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste e solte as imagens aqui ou clique para selecionar.</p>
          </div>
        )}
      </Dropzone>
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UploadForm;