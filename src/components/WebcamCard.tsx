import React from 'react';
import useWebcam from '../hooks/useWebcam';

export default function WebcamCard({
  videoRef,
  canvasRef,
  handleLoadedMetadata,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleLoadedMetadata: () => void;
}) {
  useWebcam(videoRef);

  return (
    <div className="bg-white rounded-xl p-2">
      <div className="relative flex items-center justify-center aspect-video w-full">
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
      </div>
    </div>
  );
}
