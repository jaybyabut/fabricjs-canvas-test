import "./App.css";
import { Canvas, FabricText, Circle, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import image1Url from './assets/image.png';
import image2Url from './assets/28.svg';

function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  function imageLoad(imageUrl: string) {
    if (canvas) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const fabricImage = new FabricImage(img, {
          left: 100,
          top: 100,
        });
        canvas.add(fabricImage);
        canvas.renderAll();
      }
      
    }
  }

  function addCircle() {
    if (canvas) {
      const circle = new Circle({
        radius: 50,
        fill: "rgba(60, 133, 53, 1)",
        left: 100,
        top: 100,
      });
      canvas.add(circle);
    }
  }

  function delObject() {
    if (canvas) {
      const obj = canvas.getActiveObjects();
      if (obj.length === 0) return;
      canvas.remove(...obj);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Delete") {
      delObject();
    }
  });

  function saveImage() {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        multiplier: 1,
        format: 'png',
        quality: 1.0,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas_image.png';
      link.click();
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: 500,
        width: window.innerWidth * 0.8,
        backgroundColor: "white",
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);

      function handleResize() {
        const width = window.innerWidth * 0.8;
        const height = window.innerHeight * 0.8;

        initCanvas.setWidth(width);
        initCanvas.setHeight(height);
        initCanvas.renderAll();
      }

      window.addEventListener("resize", handleResize);

      return () => {
        initCanvas.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className='container'>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <button onClick={addCircle}>Add Circle</button>
      
      <div className='imagesContainer'>
        <button onClick={() => imageLoad(image1Url)}>asd</button>
        <button onClick={() => imageLoad(image2Url)}>asd</button>
        <button onClick={saveImage}>asd</button>
        <button>asd</button>
      </div>
    </div>
  );
}


export default App;
