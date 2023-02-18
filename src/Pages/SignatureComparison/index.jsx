import React, { useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const SignatureComparison = () => {
  const [model, setModel] = useState(null);
  const [isTrueSignature, setIsTrueSignature] = useState(null);

  const sigCanvasRef1 = useRef();
  const sigCanvasRef2 = useRef();

  useEffect(() => {
    const loadModel = async () => {
      const model = await knnClassifier.create();
      await model.load('model.json');
      setModel(model);
    };

    loadModel();
  }, []);

  const compareSignatures = () => {
    const sigData1 = sigCanvasRef1.current.toDataURL().slice(22);
    const sigData2 = sigCanvasRef2.current.toDataURL().slice(22);

    const prediction1 = model.predictClass(tf.browser.fromPixels(atob(sigData1)).reshape([1, 100, 100, 4]));
    const prediction2 = model.predictClass(tf.browser.fromPixels(atob(sigData2)).reshape([1, 100, 100, 4]));

    if (prediction1.label === prediction2.label) {
      setIsTrueSignature(true);
    } else {
      setIsTrueSignature(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Assinatura 1</h2>
        <SignatureCanvas canvasProps={{ width: 200, height: 100, className: 'sigCanvas' }} ref={sigCanvasRef1} />
      </div>

      <div>
        <h2>Assinatura 2</h2>
        <SignatureCanvas canvasProps={{ width: 200, height: 100, className: 'sigCanvas' }} ref={sigCanvasRef2} />
      </div>

      <button onClick={compareSignatures}>Comparar Assinaturas</button>

      {isTrueSignature !== null && (
        <div>
          {isTrueSignature ? <p>As assinaturas são iguais.</p> : <p>As assinaturas são diferentes.</p>}
        </div>
      )}
    </div>
  );
};

export default SignatureComparison;