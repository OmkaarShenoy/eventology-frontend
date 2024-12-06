// AddSubeventPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './styles/AddSubeventPage.css';
import { FaArrowLeft } from 'react-icons/fa';

function AddSubeventPage() {
  const { eventId } = useParams();
  const [subeventData, setSubeventData] = useState({
    subevent_name: '',
    description: '',
    points: 0,
    date: '',
    time: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSubeventData({
      ...subeventData,
      [e.target.name]: e.target.value
    });
  };


  const handleBack = () => {
    // Navigate back to the previous page or dashboard
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      await axios.post(`${process.env.REACT_APP_HOST}/events/${eventId}/subevents`, subeventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Redirect back to event details page
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error('Error adding subevent:', err);
      setError(err.response ? err.response.data.detail : err.message);
    }
  };

  return (
    <div className="add-subevent-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back to My Events</span>
      </div>
      <h2>Add Subevent to Event ID: {eventId}</h2>
      {error && <div className="error-message">Error: {error}</div>}
      <form onSubmit={handleSubmit} className="add-subevent-form">
        <div className="form-group">
          <label htmlFor="subevent_name">Subevent Name:</label>
          <input
            type="text"
            id="subevent_name"
            name="subevent_name"
            value={subeventData.subevent_name}
            onChange={handleChange}
            required
            placeholder="Enter subevent name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={subeventData.description}
            onChange={handleChange}
            required
            placeholder="Enter subevent description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="points">Points:</label>
          <input
            type="number"
            id="points"
            name="points"
            value={subeventData.points}
            onChange={handleChange}
            min="0"
            required
            placeholder="Enter points"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date & Time:</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={subeventData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={subeventData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Subevent</button>
      </form>

      <Link to={`/my-events/${eventId}`} className="back-link">← Back to Event Details</Link>
    </div>
  );
}

export default AddSubeventPage;