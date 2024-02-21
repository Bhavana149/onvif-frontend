import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Onvif from './components/pages/Onvif';
import Livestream from './components/pages/LiveStream';
import Login from './components/login';
import SignUp from './components/signup';
import { CameraProvider } from './components/CameraContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleSignOut = () => {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <CameraProvider>
        {isLoggedIn && <Navbar handleSignOut={handleSignOut} setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route
            path="/"
            element={!isLoggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/home" replace />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/onvif" element={<Onvif />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
        </Routes>
      </CameraProvider>
    </Router>
  );
}

export default App;
