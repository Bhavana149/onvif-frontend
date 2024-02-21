// CameraContext.js
import React, { createContext, useState } from 'react';

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
  const [cameras, setCameras] = useState([]);

  const addCamera = (newCamera) => {
    setCameras([...cameras, newCamera]);
  };

  return (
    <CameraContext.Provider value={{ cameras, addCamera,setCameras }}>
      {children}
    </CameraContext.Provider>
  );
};

export default CameraContext;

