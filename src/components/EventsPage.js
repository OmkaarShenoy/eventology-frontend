import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/EventsPage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_HOST}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle error (e.g., redirect to login if unauthorized)
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleBack = () => {
    // Navigate back to the previous page or dashboard
    navigate('/dashboard');
  };

  const handleViewEvent = (eventId) => {
    // Navigate to the event details page
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="events-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back</span>
      </div>
      <h2>All Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.event_id}>
            <h3>{event.event_name}</h3>
            <p className="event-date">
              {event.start_date} - {event.end_date}
            </p>
            <p className="event-location">Location: {event.location}</p>
            <p className="event-description">{event.description}</p>
            <button
              className="view-event-button"
              onClick={() => handleViewEvent(event.event_id)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;