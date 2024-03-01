import React, { useContext } from 'react';
import CameraListLive from '../CameraListLive';
import CameraContext from '../CameraContext';

function Livestream() {
  const { cameras, setCameras } = useContext(CameraContext); // Destructure setCameras from CameraContext

  return (
    <div>
      <CameraListLive cameras={cameras} setCameras={setCameras} /> {/* Pass setCameras as a prop */}
    </div>
  );
}

export default Livestream;






