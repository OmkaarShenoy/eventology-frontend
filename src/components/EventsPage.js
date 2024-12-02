import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/EventsPage.css'; // Create this CSS file for styling

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <h2>All Events</h2>
      <div className="events-list">
        {events.map((event) => (
          <div className="event-card" key={event.event_id}>
            <h3>{event.event_name}</h3>
            <p>{event.description}</p>
            <p>
              {event.start_date} - {event.end_date}
            </p>
            <p>Location: {event.location}</p>
            {/* Add more event details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;