import React from 'react';
import * as faceapi from 'face-api.js';

export default function useLoadModels() {
  // Carrega os modelos quando o componente é montado
  React.useEffect(() => {
    Promise.all([
      faceapi.loadTinyFaceDetectorModel('/models'),
      faceapi.loadFaceLandmarkModel('/models'),
      faceapi.loadFaceExpressionModel('/models'),
    ]);
  }, []);
}
