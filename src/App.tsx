import React from 'react';
import Header from './components/Header';
import * as faceapi from 'face-api.js';
import useLoadModels from './hooks/useLoadModels';
import WebcamCard from './components/WebcamCard';
import ResultCard from './components/ResultCard';

function App() {
  const [expression, setExpression] = React.useState('' as string);
  const [loading, setLoading] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useLoadModels();

  // Detecta as expressões faciais a cada segundo
  async function handleLoadedMetadata() {
    const videoElement = videoRef.current as HTMLVideoElement;
    const canvasElement = canvasRef.current as HTMLCanvasElement;

    if (!videoElement || !canvasElement) return;

    const detection = await faceapi
      .detectSingleFace(
        videoElement as HTMLVideoElement,
        new faceapi.TinyFaceDetectorOptions(),
      )
      .withFaceLandmarks()
      .withFaceExpressions();

    if (detection) {
      const dominantExpression = detection.expressions.asSortedArray()[0];
      setExpression(dominantExpression.expression);

      const dimensions = {
        width: videoElement?.offsetWidth,
        height: videoElement?.offsetHeight,
      };

      faceapi.matchDimensions(canvasElement, dimensions);
      const resizedResults = faceapi.resizeResults(detection, dimensions);
      faceapi.draw.drawDetections(canvasElement, resizedResults);
      faceapi.draw.drawFaceLandmarks(canvasElement, resizedResults);
      faceapi.draw.drawFaceExpressions(canvasElement, resizedResults);

      setLoading(false);
    }

    setTimeout(() => {
      handleLoadedMetadata();
    }, 1000);
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <WebcamCard
          videoRef={videoRef}
          canvasRef={canvasRef}
          handleLoadedMetadata={handleLoadedMetadata}
        />
        <ResultCard expression={expression} loading={loading} />
      </section>
    </main>
  );
}

export default App;
