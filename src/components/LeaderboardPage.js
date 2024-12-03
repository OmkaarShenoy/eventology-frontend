import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/LeaderboardPage.css'; // Create this CSS file for styling
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/leaderboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
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
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.user_id}>
              <td>{index + 1}</td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;