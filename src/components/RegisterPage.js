import React, { useState } from 'react';
import axios from 'axios';
import './styles/RegisterPage.css'; // Create this CSS file for styling
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'participant', // Default role
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'role') {
      setFormData({
        ...formData,
        role: checked ? 'organizer' : 'participant',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to backend
      await axios.post('http://localhost:8000/register', formData);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter your first name"
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter your last name"
        />
        <label className="role-toggle">
          <input
            type="checkbox"
            name="role"
            checked={formData.role === 'organizer'}
            onChange={handleChange}
          />
          Want to create your own events? <br/> Register as an Organizer
        </label>
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;