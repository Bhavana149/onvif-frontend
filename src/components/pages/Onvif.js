// Onvif.js
import React, { useContext } from 'react';
import AddCameraDetails from '../AddCameraDetails';
import CameraContext from '../CameraContext';

function Onvif() {
  const { addCamera } = useContext(CameraContext);

  return (
    <div>
      <h1>Add New Camera</h1>
      <AddCameraDetails addCameraToList={addCamera} />
    </div>
  );
}

export default Onvif;


