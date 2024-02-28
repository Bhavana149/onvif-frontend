import React, { useContext, useState, useEffect } from 'react';
import './CameraListLive.css';
import { FaTrash } from 'react-icons/fa';
import CameraContext from './CameraContext';
import axios from 'axios';

function CameraListLive() {
  const [showCam, setShowCam] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState(null);
  const { cameras, setCameras } = useContext(CameraContext);
  const [videoStream, setVideoStream] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [videoError, setVideoError] = useState(false);

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
    setShowCam(true);

    axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_RTSP, { params: { id: id } })
      .then(response => {
        setVideoStream(response.data.rtsp_url);
        console.log('RTSP URL:', response.data.rtsp_url);
      })
      .catch(error => {
        console.error('Error fetching RTSP URL:', error);
        setVideoError(true);
      });
  };

  const handleDeleteConfirmation = (camera) => {
    setCameraToDelete(camera);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    onDeleteCamera();
    setShowDeleteConfirmation(false);
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
                <span onClick={() => handleDeleteConfirmation(cam)} className='deleteIcon'><FaTrash /></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='camright'>
        {showCam && !videoError && (
          <>
            <button
              onClick={() => { setShowCam(false); }}
              className='closebutton'
            >
              Close
            </button>
            <div className='cont'>
              <video
                src={videoStream}
                controls
                autoPlay
                width='100%'
                height='100%'
              />
            </div>
          </>
        )}
        {videoError && <div>Error loading video stream.</div>}
      </div>
      {showDeleteConfirmation && (
        <div className='deleteheading'>
          <h2>Delete Camera</h2>
          <div className="deleteConfirmation">
            <div className="confirmationMessage">
              <p>Are you sure you want to delete the {cameraToDelete.camera_name}?</p>
              <div className="confirmationButtons">
                <button onClick={handleDelete} className="yesButton">Yes</button>
                <button onClick={() => setShowDeleteConfirmation(false)} className="noButton">No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraListLive;