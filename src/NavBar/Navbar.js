import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useGlobalContext } from '../contexts/GlobalContext'; // Import useGlobalContext


function Navbar() {
  const { user, logout } = useGlobalContext(); // Destructure user and logout from context
  

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
      <Link to="/Dashboard">Dashboard</Link>
      ):<Link to=""></Link>}
      <Link to="/news">Leading Stories</Link>
      <Link to="/Search">Search</Link>
      {user ? (
        <Link onClick={logout}>Logout</Link> // Add Logout button if user is logged in
      ) : (
        <Link to="/login">Login</Link> // Show Login link if user is not logged in
      )}
      
     
    </nav>
  );
}

export default Navbar;
