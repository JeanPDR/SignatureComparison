import React from "react";
import pixelmatch from "pixelmatch";
import { useEffect, useRef, useState } from "react";

function ImageComparator({ image1, image2 }) {
  const canvasRef = useRef(null);
  const [diffPixels, setDiffPixels] = useState(null);

  useEffect(() => {
    if (image1 && image2) {
      const img1 = new Image();
      img1.src = image1;

      const img2 = new Image();
      img2.src = image2;

      img1.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = img1.width;
        canvas.height = img1.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img1, 0, 0);

        const imgData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);

        img2.onload = () => {
          ctx.drawImage(img2, 0, 0);

          const imgData2 = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          const diff = pixelmatch(
            imgData1.data,
            imgData2.data,
            null,
            canvas.width,
            canvas.height,
            { threshold: 0.1 }
          );

          setDiffPixels(diff);
        };
      };
    }
  }, [image1, image2]);

  return (
    <div>
      <h2>Comparar imagens:</h2>
      <div style={{ display: "flex" }}>
        <canvas ref={canvasRef} style={{ marginRight: "20px" }} />
        <div>
          <img src={image1} style={{ marginBottom: "10px" }} />
          <img src={image2} style={{ marginBottom: "10px" }} />
          <p>{`Pixels diferentes: ${diffPixels}`}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageComparator;