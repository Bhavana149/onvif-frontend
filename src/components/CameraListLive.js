import React, { useContext, useState } from 'react';
import './CameraListLive.css';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon from react-icons library
import CameraContext from './CameraContext';

function CameraListLive() {
    
    const [camera, setCamera] = useState({});
    const [showCam, setShowCam] = useState(false);
    const { cameras, setCameras } = useContext(CameraContext);
    
    if (!cameras) {
      return <div>Loading...</div>; // Or any other fallback UI
    }

    const onDeleteCamera = (cameraToDelete) => {
        // Filter out the camera to delete from the cameras list
        const updatedCameras = cameras.filter(cam => cam !== cameraToDelete);
        setCameras(updatedCameras); // Update the cameras list with the filtered list
        setCamera({}); // Reset the selected camera if it's deleted
        setShowCam(false); // Hide the camera display if it's deleted
    };

    return (
        <div className='livecambucket'>
            <div className='camleft'>
                <h2>Camera List</h2>      
                <ul style={{marginTop:'20px'}}>
                    {cameras.map((cam, index) => (
                        <li key={index}>
                            <div className="camButtonContainer"> {/* Container for camera name and delete icon */}
                                <button 
                                    onClick={() => {setCamera(cam); setShowCam(true);}}
                                    className='cambutton'
                                >
                                    {cam.camera_name}
                                </button>
                                <span onClick={() => onDeleteCamera(cam)} className='deleteIcon'><FaTrash /></span> {/* Delete icon with onClick event */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='camright'>
                {showCam && (
                    <>
                        <button
                            onClick={() => {setCamera({}); setShowCam(false);}}
                            className='closebutton'
                        >
                            Close
                        </button>
                        <div className='cont' style={{height:"500px",width:"600px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <img src={`http://${camera['ip_domain_name']}:${camera['port']}${camera['location']}`} alt='video' style={{height:"500px",width:"600px"}}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CameraListLive;
