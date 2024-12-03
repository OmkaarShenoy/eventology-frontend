// MyEventsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/MyEventsPage.css';
import { FaArrowLeft } from 'react-icons/fa';


function MyEventsPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve user role from localStorage
  const userRole = localStorage.getItem('user_role');

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("JWT Token:", token);

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await axios.get('http://localhost:8000/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyEvents(response.data);
    } catch (err) {
      console.error('Error fetching my events:', err);
      setError(err.response ? err.response.data.detail : err.message);
    }
  };

  const handleBack = () => {
    // Navigate back to the previous page or dashboard
    navigate('/dashboard');
  };


  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (myEvents.length === 0) {
    return <div>No events found.</div>;
  }

  return (
    <div className="my-events-page">

<div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back to My Events</span>
      </div>
      {/* Header Section with Title and Create Event Button */}
      <div className="header">
        <h2>My Events</h2>
        {userRole === 'organizer' && (
          <button className="create-event-button" onClick={handleCreateEvent}>
            Create Event
          </button>
        )}
      </div>

      {/* Events List */}
      <ul className="my-events-list">
        {myEvents.map((event) => (
          <li key={event.event_id} className="event-card">
            <Link to={`/my-events/${event.event_id}`} className="event-link">
              <h3>{event.event_name}</h3>
              <p>{event.description}</p>
              <p><strong>Start:</strong> {new Date(event.start_date).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(event.end_date).toLocaleString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <h4>Subevents:</h4>
              {event.subevents.length > 0 ? (
                <ul>
                  {event.subevents.map((subevent) => (
                    <li key={subevent.subevent_id}>
                      <strong>{subevent.subevent_name}</strong> - {subevent.description} 
                      (Points: {subevent.points}, Date: {new Date(subevent.date).toLocaleString()}, Time: {subevent.time})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No subevents.</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyEventsPage;