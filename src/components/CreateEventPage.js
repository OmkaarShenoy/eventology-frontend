import React, { useState } from 'react';
import axios from 'axios';
import './styles/CreateEventPage.css'; // Create this CSS file for styling
import { useNavigate } from 'react-router-dom';

function CreateEventPage() {
  const [eventData, setEventData] = useState({
    event_name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/events', eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/my-events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="create-event-page">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="event_name"
            value={eventData.event_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="start_date"
            value={eventData.start_date}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="end_date"
            value={eventData.end_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEventPage;