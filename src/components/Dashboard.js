import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); // Ensure 'role' is included in the token
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle token decoding errors
        // Optionally, log the user out if the token is invalid
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      // Redirect to login if no token
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="tiles-container">
        {/* Events Tile */}
        <div className="tile">
          <Link to="/events">
            <h3>Events</h3>
          </Link>
        </div>
        {/* Leaderboard Tile */}
        <div className="tile">
          <Link to="/leaderboard">
            <h3>Leaderboard</h3>
          </Link>
        </div>
        {/* Conditionally render organizer tiles */}
        {role === 'organizer' && (
          <>
            {/* My Events Tile */}
            <div className="tile">
              <Link to="/my-events">
                <h3>My Events</h3>
              </Link>
            </div>
            {/* Check-in Tile */}
            <div className="tile">
              <Link to="/check-in">
                <h3>Check-in</h3>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;