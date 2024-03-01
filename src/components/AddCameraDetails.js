import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import modal component from React Bootstrap
import './AddCameraDetails.css'; // Import your CSS file

function AddCameraDetails({ addCameraToList }) {
  const [showModal, setShowModal] = useState(false);
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [camera_name, setCameraName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddCameraClick = () => {
    setShowModal(!showModal);
    setShowSuccessMessage(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ip.trim() || !port.trim() || !camera_name.trim() || !username.trim() || !password.trim()) {
      alert('Please provide all required details');
      return;
    }

    const newCamera = {
      ip,
      port,
      camera_name,
      username,
      password,
    };

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
        <div className="add-camera-box" onClick={handleAddCameraClick}>
          <h2 className="add-camera-heading">Add Camera +</h2>
        </div>
      </div>

      <Modal show={showModal} onHide={handleAddCameraClick}>
        <Modal.Header closeButton>
          <Modal.Title>Add Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="add-camera-details" onSubmit={handleSubmit}>
            <label htmlFor="username">Username: <span className="mandatory">*</span></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password: <span className="mandatory">*</span></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="camera_name">Camera Name: <span className="mandatory">*</span></label>
            <input
              type="text"
              id="camera_name"
              value={camera_name}
              onChange={(e) => setCameraName(e.target.value)}
              required
            />
            <label htmlFor="ip">IP Address: <span className="mandatory">*</span></label>
            <input
              type="text"
              id="ip"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              required
            />
            <label htmlFor="port">Port: <span className="mandatory">*</span></label>
            <input
              type="text"
              id="port"
              value={port}
              onChange={handlePortChange}
              required
            />
            <Button variant="primary" type="submit">Submit</Button>
          </form>
          {showSuccessMessage && (
            <div className="success-message">Camera added successfully!</div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddCameraDetails;
