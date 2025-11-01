import "./App.css";
import { Canvas, FabricText, Circle, FabricImage } from "fabric";
import { useEffect, useRef, useState } from "react";
import image1Url from './assets/image.png';
import image2Url from './assets/28.svg';
import { app, storage } from "./firebase";
import { uploadString, ref } from "firebase/storage";



function App() {
  const filename = 'filetest.png'; // unique name for each upload
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  function stickerLoad(imageUrl: string) {
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
    const photoStrips = ref(storage, 'photoStrips/' + filename);
    if (canvas) {
      const dataURL = canvas.toDataURL({
        multiplier: 1,
        format: 'png',
        quality: 1.0,
      });
      
      uploadString(photoStrips, dataURL, 'data_url').then((snapshot) => {
        console.log('uploaded data file successfully');
      });
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: window.innerHeight * 0.8,
        width: (2/3) * (window.innerHeight * 0.8),
        backgroundColor: "white",
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);

      function handleResize() {
        const width = (2/3) * (window.innerHeight * 0.8);
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
        <button onClick={() => stickerLoad(image1Url)}>sticker 1</button>
        <button onClick={() => stickerLoad(image2Url)}>sticker 2</button>
        <button onClick={saveImage}>Save Image</button>
        <button>asd</button>
      </div>
    </div>
  );
}


export default App;
