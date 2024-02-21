import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCameraDetails.css'; // Import your CSS file

function AddCameraDetails({ addCameraToList }) { // Add addCameraToList as a prop
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [ip_domain_name, setip_domain_name] = useState('');
  const [port, setPort] = useState('');
  const [location, setLocation] = useState('');
  const [camera_name, setcamera_name] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  

  useEffect(() => {
    if (showSuccessMessage) {
      // After 3 seconds, reset the form and success message
      const timer = setTimeout(() => {
        setShowAddCamera(true);
        setShowSuccessMessage(false);
        setip_domain_name('');
        setPort('');
        setLocation('');
        setcamera_name('');
      }, 3000);

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleAddCameraClick = () => {
    setShowAddCamera(!showAddCamera);
    // Reset success message when showing the form again
    setShowSuccessMessage(false);
  };

  const newCamera = {
    ip_domain_name,
    port,
    location,
    camera_name
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation - ensuring IP address and port are provided
    axios.post(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ADD_CAMERA, newCamera) // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend endpoint
      // Add the new camera to the list
      .then(res=>{
        addCameraToList(newCamera);
        
        // Show success message
        setShowSuccessMessage(true);
      })
      .catch(err=>{
        console.log(err)
      })

    if (!ip_domain_name.trim() || !port.trim() || !camera_name.trim()) {
      alert('Please provide all required details');
      return;
    }

    // Add the new camera to the list
    addCameraToList(newCamera);
    
    setShowSuccessMessage(true);
  };

  const handlePortChange = (e) => {
    // Allow only numeric values for the port
    const value = e.target.value.replace(/\D/, '');
    setPort(value);
  };

  return (
    <div className="add-camera-container">
      <div className="add-camera-heading-container">
        <div className="add-camera-box">
          <h2 className="add-camera-heading">Add Camera</h2>
        </div>
        <div className="add-camera-box">
          <button className="add-camera-icon" onClick={handleAddCameraClick}>+</button>
        </div>
      </div>


      {showAddCamera && !showSuccessMessage && (
        <form className="add-camera-details" onSubmit={handleSubmit}>
          <label htmlFor="camera_name">Camera Name:</label>
          <input
            type="text"
            id="camera_name"
            value={camera_name}
            onChange={(e) => setcamera_name(e.target.value)}
            required
          />
          <label htmlFor="ip_domain_name">IP Address:</label>
          <input
            type="text"
            id="ip_domain_name"
            value={ip_domain_name}
            onChange={(e) => setip_domain_name(e.target.value)}
            required
          />
          <label htmlFor="port">Port:</label>
          <input
            type="text"
            id="port"
            value={port}
            onChange={handlePortChange}
            required
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {showSuccessMessage && (
        <div className="success-message">Camera added successfully!</div>
      )}
    </div>
  );
}

export default AddCameraDetails;
