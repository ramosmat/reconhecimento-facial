import React from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import * as faceapi from 'face-api.js';
import { translateExpressionToEmoji } from './lib/utils';
import ResultMessage from './components/ResultMessage';

function App() {
  const [expression, setExpression] = React.useState('' as string);
  const [loading, setLoading] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Inicializa a câmera quando o componente é montado
  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    });
  }, []);

  // Carrega os modelos quando o componente é montado
  React.useEffect(() => {
    Promise.all([
      faceapi.loadTinyFaceDetectorModel('/models'),
      faceapi.loadFaceLandmarkModel('/models'),
      faceapi.loadFaceExpressionModel('/models'),
    ]).then(() => {
      console.log('teste');
    });
  }, []);

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
        <div className="bg-white rounded-xl p-2">
          <div className="relative flex items-center justify-center aspect-video w-full">
            {/* Substitua pela Webcam */}
            <div className="aspect-video rounded-lg bg-gray-300 w-full">
              <div className="relative">
                <video
                  onLoadedMetadata={handleLoadedMetadata}
                  autoPlay
                  ref={videoRef}
                  className="rounded aspect-video"
                ></video>
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                ></canvas>
              </div>
            </div>
            {/* Substitua pela Webcam */}
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex gap-6 lg:gap-20 items-center h-[200px] ${
            loading ? 'justify-center' : 'justify-between'
          }`}
        >
          {loading ? (
            <div className="text-amber-300 text-6xl flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <span className="lg:text-[100px] text-6xl">
                {expression && translateExpressionToEmoji(expression)}
              </span>
              <h3 className="text-3xl text-right lg:text-4xl md:text-3xl text-neutral-500 font-secondary">
                <ResultMessage expression={expression} />
              </h3>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
