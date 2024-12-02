import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/MyEventsPage.css'; // Create this CSS file for styling

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/my-events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching my events:', error);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="my-events-page">
      <h2>My Events</h2>
      <button onClick={() => navigate('/create-event')}>Create Event</button>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.event_id}>
            <h3>{event.event_name}</h3>
            <p>{event.description}</p>
            {/* Add more event details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEventsPage;