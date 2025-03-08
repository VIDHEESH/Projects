// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Save A Life</h1>
        <p className="home-description">
          Making a difference in the lives of those in need. Join us in our mission to help and support communities worldwide.
        </p>
        <div className="button-container">
          <button 
            className="primary-button"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
          <button 
  className="secondary-button"
  onClick={() => navigate('/learn-more')}
>
  Learn More
</button>

        </div>
      </div>
    </div>
  );
};

export default Home;