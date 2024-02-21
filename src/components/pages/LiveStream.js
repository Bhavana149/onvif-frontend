import React, { useContext } from 'react';
import CameraListLive from '../CameraListLive';
import CameraContext from '../CameraContext';

function Livestream() {
  const { cameras, setCameras } = useContext(CameraContext); // Destructure setCameras from CameraContext

  return (
    <div>
      <h3>Select the Camera to view the live stream </h3>
      <CameraListLive cameras={cameras} setCameras={setCameras} /> {/* Pass setCameras as a prop */}
    </div>
  );
}

export default Livestream;






