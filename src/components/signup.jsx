import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = () => {
    alert("Sign up Successful");
    // Implement sign-up logic here
  };

  return (
    <div className="vh-100" style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20230623/pngtree-blurred-background-of-retail-shop-with-3d-cctv-or-security-camera-image_3659361.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div style={{width:"90vw",height:"100vh"}} className="d-flex flex-column justify-content-center align-items-end">
      <div className="mb-4"></div> {/* Space */}
        <form className="col-12 col-md-6 py-4 px-3 white-border" style={{width:"max-content"}}>
        <h2 className="mb-3">Shyena Camera Management </h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="text-center">
            <button
              className="signup-btn py-3 px-2 rounded-3"
              onClick={() => handleSignup()}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mt-4">
            Already Registered ? <Link to="/">Log in</Link>
          </div>
        </form>
              
        </div>
    </div>
  );
}

export default SignUp;
