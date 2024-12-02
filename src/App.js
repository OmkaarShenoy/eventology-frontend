import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import EventsPage from './components/EventsPage';
import LeaderboardPage from './components/LeaderboardPage';
import MyEventsPage from './components/MyEventsPage';
import CreateEventPage from './components/CreateEventPage';
import CheckInPage from './components/CheckInPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        {/* Add a default route or redirect */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;