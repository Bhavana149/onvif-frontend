import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./login.css";

function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Email:", email);
        console.log("Password:", password);
        // Perform login logic here
        if (email === 'shyena@gmail.com' && password === '1234') {
            console.log("Login successful");
            handleLogin();
            setIsLoggedIn(true);
        } else {
            console.log("Login failed");
            setLoginError(true);
        }
    }

    if (isLoggedIn) {
        return <Navigate to="/home" replace />; // Redirect to home page with Navbar displayed
    }

    console.log("Rendering Login component. isLoggedIn:", isLoggedIn);

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
                {loginError && <p className="text-danger">Incorrect username or password</p>}
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

