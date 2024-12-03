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
import HomePage from './components/HomePage';
import EventDetailsPage from './components/EventDetailsPage';
import EventLeaderboardPage from './components/EventLeaderboardPage'; // Create this componen
import MyEventDetailsPage from './components/MyEventDetailsPage'
import EditEventPage from './components/EditEventPage'
import AddSubeventPage from './components/AddSubeventPage'

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
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/my-events/:eventId" element={<MyEventDetailsPage />} />
        <Route path="/events/:eventId/leaderboard" element={<EventLeaderboardPage />} />
        <Route path="/my-events/:eventId/edit" element={<EditEventPage />} />
        <Route path="/my-events/:eventId/add-subevent" element={<AddSubeventPage />} />
        {/* Add a default route or redirect */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;