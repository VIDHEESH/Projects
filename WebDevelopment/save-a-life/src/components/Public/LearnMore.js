import React from 'react';
import './LearnMore.css';
import natureImage from './n2.png'; // Adjust based on your actual file structure

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      <img src={natureImage} alt="Nature Prayer" className="learn-more-image" />
    </div>
  );
};

export default LearnMore;
