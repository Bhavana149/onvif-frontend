import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Store';
import React, { useState } from 'react';
import Home from './components/pages/Home';
import Livestream from './components/pages/Cameras';
import Login from './components/login';
import SignUp from './components/signup';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import { CameraProvider } from './components/CameraContext';
import './App.css';

function App() {
  const [isLoggedIn] = useState(false);

  
  
  return (
    <Provider store={store}>
      <Router>
        <CameraProvider>
          {/* Navbar */}
          {isLoggedIn && <Navbar />}
          <Routes>
            {/* Login page */}
            <Route path="/" element={<Login/>} />

            {/* Home page */}
            <Route path="/home" element={<Layout><Home /></Layout>} />

            {/* Other routes */}
            
            <Route path="/livestream" element={<Layout><Livestream /></Layout>} />
            <Route path="/signup" element={<Layout><SignUp /></Layout>} />
          </Routes>
        </CameraProvider>
      </Router>
    </Provider>
  );
}

export default App;