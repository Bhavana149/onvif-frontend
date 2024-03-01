import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './CameraListLive.css'; // Import your CSS file
import { FaInfoCircle, FaVideo, FaTrash } from 'react-icons/fa';
import { Dialog } from 'primereact/dialog';
import CameraContext from './CameraContext';
import AddCameraDetails from './AddCameraDetails';

function CameraListLive() {
  const { cameras, setCameras } = useContext(CameraContext);
  const [showCam, setShowCam] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [selectedCameraInfo, setSelectedCameraInfo] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_GET_CAMERA)
      .then(response => {
        setCameras(response.data.cameras);
      })
      .catch(error => {
        console.error('Error fetching cameras:', error);
      });
  }, [setCameras, isDeleted]);

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
    // Close any existing pop-ups before opening a new one
    setShowDeleteConfirmation(false);
    setShowInfoDialog(false);

    // Open the new pop-up for live stream
    setShowCam(true);
    setSelectedCameraInfo({ id });
  };

  const handleDeleteConfirmation = (camera) => {
    // Close any existing pop-ups before opening a new one
    setShowCam(false);
    setShowInfoDialog(false);

    // Open the delete confirmation pop-up
    setCameraToDelete(camera);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    onDeleteCamera();
    setShowDeleteConfirmation(false);
  };

  const showCameraInfo = (camera) => {
    // Close any existing pop-ups before opening a new one
    setShowCam(false);
    setShowDeleteConfirmation(false);

    // Open the camera info pop-up
    setSelectedCameraInfo(camera);
    setShowInfoDialog(true);
  };

  return (
    <div className='livecambucket' style={{ 
      backgroundImage: 'url("https://img.freepik.com/premium-photo/cctv-camera-security-system-business-technology-safety-concept-d-render-illustration_628331-177.jpg")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'cover', 
      backgroundRepeat: 'no-repeat', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    
      <AddCameraDetails addCameraToList={(newCamera) => setCameras([...cameras, newCamera])} />
      
      <div className='table-container' style={{ marginTop: '-460px', width: '90%' }}> {/* Apply margin-top and width */}
        <table className='camera-table'>
          <thead>
            <tr>
              <th style={{ fontSize: '1.5em' }}>Sl. No</th>
              <th style={{ fontSize: '1.5em' }}>Camera Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cameras && cameras.map((cam, index) => (
              <tr key={index}>
                <td style={{ fontSize: '1.2em' }}>{cam.id}</td>
                <td style={{ fontSize: '1.2em' }}>{cam.camera_name}</td>
                <td>
                  <FaInfoCircle onClick={() => showCameraInfo(cam)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FaVideo onClick={() => fetchVideoStream(cam.id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <FaTrash onClick={() => handleDeleteConfirmation(cam)} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Other Dialog components */}
      {showCam && (
        <Dialog header= <h4> Live Stream </h4> visible={showCam} style={{  width: '80vw', marginLeft: '10px', marginTop: '10px' }} onHide={() => setShowCam(false)}>
          <hr></hr>
          <div className='cont'>
            <img src={`http://192.168.29.138:8001/myapp/live-stream/?id=${selectedCameraInfo.id}`} width='100%' height='100%' alt='' />
          </div>
        </Dialog>
      )}
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
     <Dialog
        header={<div style={{ display: 'flex', alignItems: 'center' }}> <h4>Camera Information </h4></div>}
        visible={showInfoDialog}
        style={{ width: '50vw', height: '70vh', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        onHide={() => setShowInfoDialog(false)}
      >
        
          <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Camera Name: <span>{selectedCameraInfo?.camera_name}</span></h6>
            <hr></hr>
            
            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Ip: <span>{selectedCameraInfo?.ip}</span></h6>
            <hr></hr>


            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Port:<span>{selectedCameraInfo?.port}</span></h6>
            <hr></hr>

            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Device Type:<span>{selectedCameraInfo?.device_type}</span></h6>
            <hr></hr>
            
            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Username:<span>{selectedCameraInfo?.username}</span></h6>
            <hr></hr>
            
            <div className='d-flex '/>
            
            <h6 style={{marginLeft:"20px"}}>Password:<span>{selectedCameraInfo?.password}</span></h6>    
            <hr></hr>

            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Model:<span>{selectedCameraInfo?.device_model}</span></h6>    
            <hr></hr>

            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Serial Number:<span>{selectedCameraInfo?.serial_number}</span></h6>    
            <hr></hr>

            <div className='d-flex '/>
            <h6 style={{marginLeft:"20px"}}>Firmre Version:<span>{selectedCameraInfo?.firmre_version}</span></h6>    
            <hr></hr>



          
          
        
      </Dialog>

    </div>
  );
}

export default CameraListLive;
