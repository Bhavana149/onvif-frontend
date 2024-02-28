import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from './Reducer';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Email:", email);
    console.log("Password:", password);
  
    // Set the isLoggedIn state to true
    dispatch(setLogin(true));
  
    // Navigate to the home page after successful login
    navigate('/home', { replace: true });
  }

  return (
    <div className="vh-100" style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20230623/pngtree-blurred-background-of-retail-shop-with-3d-cctv-or-security-camera-image_3659361.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div style={{width:"90vw",height:"100vh"}} className="d-flex flex-column justify-content-center align-items-end">
        <div className="mb-4"></div> {/* Space */}
        <form className="col-12 col-md-6 py-4 px-3 white-border" style={{width:"max-content"}} onSubmit={handleSubmit}>
          <h2 className="mb-3">Shyena Camera Management </h2>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id='email' placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="password">Password</label>
          </div>
          <div className="text-center">
            <button type="submit" className="login-btn py-3 px-2 rounded-3">
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            Not Registered ? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
