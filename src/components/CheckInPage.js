import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/CheckInPage.css'; // Create this CSS file for styling

function CheckInPage() {
  const [subevents, setSubevents] = useState([]);
  const [selectedSubevent, setSelectedSubevent] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');

  useEffect(() => {
    const fetchSubevents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_HOST}/subevents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Subevents response:', response.data); // Debugging log
        setSubevents(response.data);
      } catch (error) {
        console.error('Error fetching sub-events:', error);
      }
    };
  
    fetchSubevents();
  }, []);

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/check-in`,
        {
          subevent_id: selectedSubevent,
          participant_email: participantEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Success: ${response.data.message}. Points awarded: ${response.data.points_awarded}`);
      setParticipantEmail('');
  
    } catch (error) {
      console.error('Error during check-in:', error);
      alert(`Error: ${error.response?.data?.detail || 'An unexpected error occurred.'}`);
    }
  };  

  return (
    <div className="check-in-page">
      <h2>Check-in</h2>
      <div className="check-in-form">
        <label>
          Select Sub-event:
          <select
            value={selectedSubevent}
            onChange={(e) => setSelectedSubevent(e.target.value)}
          >
            <option value="">-- Select --</option>
            {subevents.map((subevent) => (
              <option value={subevent.subevent_id} key={subevent.subevent_id}>
                {subevent.subevent_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Participant Email:
          <input
            type="email"
            value={participantEmail}
            onChange={(e) => setParticipantEmail(e.target.value)}
          />
        </label>
        <button onClick={handleCheckIn}>Check In</button>
      </div>
    </div>
  );
}

export default CheckInPage;