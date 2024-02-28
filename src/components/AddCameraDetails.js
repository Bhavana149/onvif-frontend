import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCameraDetails.css'; // Import your CSS file

function AddCameraDetails({ addCameraToList }) {
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [camera_name, setCameraName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowAddCamera(true);
        setShowSuccessMessage(false);
        setIp('');
        setPort('');
        setCameraName('');
        setUsername('');
        setPassword('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleAddCameraClick = () => {
    setShowAddCamera(!showAddCamera);
    setShowSuccessMessage(false);
  };

  const newCamera = {
    ip,
    port,
    camera_name,
    username,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ip.trim() || !port.trim() || !camera_name.trim() || !username.trim() || !password.trim()) {
      alert('Please provide all required details');
      return;
    }

    console.log("Submitting camera details:", newCamera); 

    axios.post(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ADD_CAMERA, newCamera)
      .then(res => {
        addCameraToList(newCamera);
        alert(res.data.message)
        setShowSuccessMessage(true);
      })
      .catch(err => {
        console.log(err)
      });
  };

  const handlePortChange = (e) => {
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="camera_name">Camera Name:</label>
          <input
            type="text"
            id="camera_name"
            value={camera_name}
            onChange={(e) => setCameraName(e.target.value)}
            required
          />
          <label htmlFor="ip">IP Address:</label>
          <input
            type="text"
            id="ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
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
