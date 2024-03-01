import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png'; // Import the logo image

function Navbar({ handleSignOut }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo mx-2' onClick={closeMobileMenu}>
            <img src={logo} alt="Logo" className="logo-image" /> {/* Use the logo variable */}
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link
                to='/livestream'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Cameras
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='nav-links-mobile'
                onClick={() => {
                  closeMobileMenu();
                  handleSignOut();
                }}
              >
                Sign Out
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' onClick={handleSignOut}>SIGN OUT</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

