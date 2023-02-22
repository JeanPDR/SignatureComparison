import React from 'react';

function Result({ score }) {
  return <p>A pontuação de semelhança é {score.toFixed(2)}%.</p>;
}

export default Result;