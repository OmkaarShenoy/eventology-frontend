import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/EventLeaderboardPage.css'; // Create this CSS file
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function EventLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:8000/events/${eventId}/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchLeaderboard();
  }, [eventId, navigate]);

  const handleBack = () => {
    // Navigate back to the event details page
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="event-leaderboard-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back to Event</span>
      </div>
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Participant</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.user_id}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventLeaderboardPage;