import React from 'react';

export default function useWebcam(videoRef: React.RefObject<HTMLVideoElement>) {
  // Inicializa a câmera quando o componente é montado
  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = stream;
      }
    });
  }, [videoRef]);
}
