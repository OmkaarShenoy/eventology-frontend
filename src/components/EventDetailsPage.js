// EventDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import './styles/EventDetailsPage.css'; // Ensure the path is correct


function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const [subevents, setSubevents] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:8000/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(eventResponse.data);

        // Fetch associated subevents
        const subeventsResponse = await axios.get(
          `http://localhost:8000/events/${eventId}/subevents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubevents(subeventsResponse.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchEventDetails();
  }, [eventId, navigate]);

  const handleBack = () => {
    navigate('/events');
  };

  const handleLeaderboard = () => {
    navigate(`/events/${eventId}/leaderboard`);
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="event-details-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back to My Events</span>
      </div>
      <h2>{event.event_name}</h2>
      <p className="event-date">
        {format(new Date(event.start_date), 'MMMM d, yyyy')} -{' '}
        {format(new Date(event.end_date), 'MMMM d, yyyy')}
      </p>
      <p className="event-location">Location: {event.location}</p>
      <p className="event-description">{event.description}</p>

      <h3>Subevents:</h3>
      <ul className="subevents-list">
        {subevents.length > 0 ? (
          subevents.map((subevent) => (
            <li key={subevent.subevent_id} className="subevent-card">
              <h4 className="subevent-name">{subevent.subevent_name}</h4>
              <p className="subevent-description">{subevent.description}</p>
              <div className="subevent-info">
                <span className="subevent-date">
                  <strong>Date:</strong> {format(new Date(subevent.date), 'MMMM d, yyyy')}
                </span>
                <span className="subevent-time">
                  <strong>Time:</strong> {format(new Date(`1970-01-01T${subevent.time}Z`), 'h:mm a')}
                </span>
                <span className="subevent-points">
                  <strong>Points:</strong> {subevent.points}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>No subevents available.</p>
        )}
      </ul>

      <button className="leaderboard-button" onClick={handleLeaderboard}>
        View Leaderboard
      </button>
    </div>
  );
}

export default EventDetailsPage;