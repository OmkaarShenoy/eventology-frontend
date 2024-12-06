// EditEventPage.js (Frontend)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './styles/EditEventPage.css';
import { FaArrowLeft } from 'react-icons/fa';

function EditEventPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    event_name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: ''
  });
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

      const response = await axios.get(`${process.env.REACT_APP_HOST}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const event = response.data;
      setEventData({
        event_name: event.event_name,
        description: event.description,
        start_date: new Date(event.start_date).toISOString().slice(0,16), // Format for datetime-local
        end_date: new Date(event.end_date).toISOString().slice(0,16),
        location: event.location
      });
    } catch (err) {
      console.error('Error fetching event details:', err);
      setError(err.response ? err.response.data.detail : err.message);
    }
  };

  useEffect(() => {
    fetchEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      await axios.put(`${process.env.REACT_APP_HOST}/events/${eventId}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect back to event details page
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error('Error updating event:', err);
      setError(err.response ? err.response.data.detail : err.message);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!eventData.event_name) {
    return <div>Loading event data...</div>;
  }

  return (
    <div className="edit-event-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back to My Events</span>
      </div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="edit-event-form">
        <div className="form-group">
          <label htmlFor="event_name">Event Name:</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={eventData.event_name}
            onChange={handleChange}
            required
            placeholder="Enter event name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            placeholder="Enter event description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date & Time:</label>
          <input
            type="datetime-local"
            id="start_date"
            name="start_date"
            value={eventData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date & Time:</label>
          <input
            type="datetime-local"
            id="end_date"
            name="end_date"
            value={eventData.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
            placeholder="Enter event location"
          />
        </div>

        <button type="submit" className="submit-button">Update Event</button>
      </form>

      <Link to={`/my-events/${eventId}`} className="back-link">← Back to Event Details</Link>
    </div>
  );
}

export default EditEventPage;