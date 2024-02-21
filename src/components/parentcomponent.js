import React, { useState } from 'react';
import AddCamera from './components/AddCamera';
import CameraList from './components/CameraList';
import LiveStream from './components/LiveStream';
import { SelectedCamera } from './components/LiveStream'; 






function parent() {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const handleAddCamera = (newCamera) => {
    setCameras([...cameras, { ...newCamera, id: Date.now() }]);
  };

  const handleEditCamera = (camera) => {
    // Implement edit functionality
  };

  const handleDeleteCamera = (camera) => {
    setCameras(cameras.filter((c) => c.id !== camera.id));
  };

  const handleSelectCamera = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <PageContainer>
      
      <Main>
        <AddCamera onAddCamera={handleAddCamera} />
        <CameraList
          cameras={cameras}
          onEdit={handleEditCamera}
          onDelete={handleDeleteCamera}
          onSelect={handleSelectCamera}
        />
        <SelectedCamera>
          <LiveStream selectedCamera={selectedCamera} />
        </SelectedCamera>
      </Main>
    
    </PageContainer>
  );
}

export default parent;
