import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Eventology</h1>
          <p>Revolutionize your event experience with cutting-edge technology.</p>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister} className="register-button">
            Register
          </button>
        </div>
        <div className="hero-image">
          <img src="/images/hero.png" alt="Event illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Eventology?</h2>
        <div className="features-container">
          <div className="feature">
            <h3>Seamless Event Management</h3>
            <p>
              Organize and manage events effortlessly with our intuitive platform.
            </p>
          </div>
          <div className="feature">
            <h3>Real-Time Leaderboards</h3>
            <p>
              Engage participants with live leaderboards and gamification.
            </p>
          </div>
          <div className="feature">   
            <h3>Instant Check-In</h3>
            <p>
              Streamline attendee check-in with quick and easy verification.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Get Started with Eventology Today!</h2>
        <button onClick={handleRegister}>Create an Account</button>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Eventology. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;