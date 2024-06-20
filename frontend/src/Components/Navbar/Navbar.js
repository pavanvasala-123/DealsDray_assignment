// Navbar.js

import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar styles
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Features/user';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = ()=>{
    dispatch(logout(null))
    navigate('/')

  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>
        <div className="navbar-links">
          {!isAuthenticated && (
            <>
              <Link to="/" className="navbar-link">
                Sign In
              </Link>
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/employee-list" className="navbar-link">
                Home
              </Link>
              <Link to="/create-employee" className="navbar-link">
                Create Employee
              </Link>
              <button className="navbar-button" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
