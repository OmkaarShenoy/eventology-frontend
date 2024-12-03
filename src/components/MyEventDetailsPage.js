// MyEventDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './styles/MyEventDetailsPage.css';
import { FaArrowLeft } from 'react-icons/fa';

function MyEventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve user role from localStorage
  const userRole = localStorage.getItem('user_role');

  const handleBack = () => {
    // Navigate back to the previous page or dashboard
    navigate('/dashboard');
  };


  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await axios.get(`http://localhost:8000/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvent(response.data);
    } catch (err) {
      console.error('Error fetching event details:', err);
      setError(err.response ? err.response.data.detail : err.message);
    }
  };

  useEffect(() => {
    fetchEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const handleEditEvent = () => {
    navigate(`/my-events/${eventId}/edit`);
  };

  const handleAddSubevent = () => {
    navigate(`/my-events/${eventId}/add-subevent`);
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-details-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back to My Events</span>
      </div>
      <h2>{event.event_name}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Start Date & Time:</strong> {new Date(event.start_date).toLocaleString()}</p>
      <p><strong>End Date & Time:</strong> {new Date(event.end_date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>

      <h3>Subevents:</h3>
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

      {userRole === 'organizer' && (
        <div className="buttons">
          <button className="edit-button" onClick={handleEditEvent}>Edit Event</button>
          <button className="add-subevent-button" onClick={handleAddSubevent}>Add Subevent</button>
        </div>
      )}

      
    </div>
  );
}

export default MyEventDetailsPage;