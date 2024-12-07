import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/LeaderboardPage.css'; // Create this CSS file for styling
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_HOST}/leaderboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Leaderboard response:', response.data); // Debugging log
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };    

    fetchLeaderboard();
  }, []);

  const handleBack = () => {
    // Navigate back to the previous page or dashboard
    navigate('/dashboard');
  };

  return (
    <div className="leaderboard-page">
      <div className="back-button" onClick={handleBack}>
        <FaArrowLeft />
        <span>Back</span>
      </div>
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User ID</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={`${entry.event_id}-${index}`}>
              <td>{index + 1}</td>
              <td>
                {entry.first_name} {entry.last_name}
              </td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
