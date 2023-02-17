import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as knn from '@tensorflow-models/knn-classifier';
import Dropzone from 'react-dropzone';

const SignatureComparison = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signature, setSignature] = useState(null);
  const [classification, setClassification] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await knn.create();
      setModel(loadedModel);
      setLoading(false);
    }
    loadModel();
  }, []);

  async function handleDrop(files) {
    const file = files[0];
    const img = new Image();
    img.onload = async () => {
      const data = tf.browser.fromPixels(img);
      const resized = tf.image.resizeBilinear(data, [100, 100]).toFloat();
      const tensor = tf.div(resized, tf.scalar(255));
      const features = model.predict(tensor.reshape([-1, 100, 100, 3]));
      const res = await model.predictClass(features);
      setClassification(res.label);
    };
    img.src = URL.createObjectURL(file);
    setSignature(file);
  }

  return (
    <div>
      <h1>Comparação de Assinaturas</h1>
      {loading ? (
        <p>Carregando modelo...</p>
      ) : (
        <>
          <p>Arraste e solte uma imagem de assinatura para comparar</p>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {signature ? (
                  <img src={URL.createObjectURL(signature)} alt="Assinatura" />
                ) : (
                  <p>Clique ou arraste uma imagem aqui para carregar</p>
                )}
              </div>
            )}
          </Dropzone>
          {classification !== null && (
            <p>
              A assinatura é {classification === 0 ? 'falsa' : 'verdadeira'}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SignatureComparison;
