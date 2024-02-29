import React, { useContext, useState, useEffect } from 'react';
import './CameraListLive.css';
import { FaEllipsisV } from 'react-icons/fa'; // Using three dots icon
import CameraContext from './CameraContext';
import axios from 'axios';

function CameraListLive() {
  const [showCam, setShowCam] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState(null);
  const { cameras, setCameras } = useContext(CameraContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [selectedCameraId, setSelectedCameraId] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_CAMERA)
      .then(response => {
        setCameras(response.data.cameras);
      })
      .catch(error => {
        console.error('Error fetching cameras:', error);
      });
  }, [setCameras, isDeleted]);

  if (!cameras) {
    return <div>Loading...</div>;
  }

  const onDeleteCamera = () => {
    if (cameraToDelete) {
      axios.delete(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_DELETE_CAMERA, { data: { id: cameraToDelete.id } })
        .then(response => {
          setIsDeleted(!isDeleted);
          setShowDeleteConfirmation(false);
          console.log(response);
        })
        .catch(error => {
          console.error('Error deleting camera:', error);
        });
    }
  };

  const fetchVideoStream = (id) => {
    setSelectedCameraId(id);
    setShowCam(true);
  };

  const handleDeleteConfirmation = (camera) => {
    setCameraToDelete(camera);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    onDeleteCamera();
    setShowDeleteConfirmation(false);
  };

  const handleOptionMenuClick = (camera) => {
    setShowOptionsMenu(camera.id === showOptionsMenu ? null : camera.id);
  };

  return (
    <div className='livecambucket'>
      <div className='camleft'>
        <h2 className="heading-background">Camera List</h2>
        <ul className="camera-grid">
          {cameras.map((cam, index) => (
            <li key={index}>
              <div className="camButtonContainer">
                <button
                  onClick={() => fetchVideoStream(cam.id)}
                  className='cambutton'
                >
                  {cam.camera_name}
                </button>
                <span onClick={() => handleOptionMenuClick(cam)} className='optionIcon'><FaEllipsisV /></span>
                {showOptionsMenu === cam.id && (
                  <div className="optionMenu">
                    <ul>
                      <li onClick={() => handleDeleteConfirmation(cam)} style={{ cursor: 'pointer' }}>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='camright'>
        {showCam && selectedCameraId && (
          <>
            <button
              onClick={() => { setShowCam(false); }}
              className='closebutton'
            >
              Close
            </button>
            <div className='cont'>
              <img
                src={`http://192.168.29.138:8001/myapp/live-stream/?id=${selectedCameraId}`}
                width='100%'
                height='100%'
                alt=''
              />
            </div>
          </>
        )}
      </div>
      {showDeleteConfirmation && (
        <div className='deleteheading'>
          <h2>Delete Camera</h2>
          <div className="confirmationMessage">
            <p>Are you sure you want to delete the {cameraToDelete.camera_name}?</p>
            <div className="confirmationButtons">
              <button onClick={handleDelete} className="yesButton">Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)} className="noButton">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraListLive;
