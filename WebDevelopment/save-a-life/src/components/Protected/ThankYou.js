import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting donation details from the state
  const { name, amount } = location.state || { name: 'Donor', amount: 0 };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Thank You, {name}!</h2>
        </div>
        <div className="card-body">
          <p>We deeply appreciate your generous contribution of:</p>
          <h3>₹{amount.toLocaleString()}</h3>
          <p>
            Your support plays a vital role in helping us protect wildlife and preserve our natural heritage.
          </p>
          <button onClick={() => navigate('/')} className="back-button">
            Go Back to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          background: linear-gradient(to bottom right, #56ab2f, #a8e063);
        }
        .card {
          max-width: 400px;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .card-header h2 {
          color: #388e3c;
        }
        .card-body {
          margin-top: 16px;
        }
        .card-body h3 {
          color: #2e7d32;
          margin: 16px 0;
        }
        .back-button {
          margin-top: 16px;
          padding: 12px 16px;
          background: #388e3c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .back-button:hover {
          background: #2e7d32;
        }
      `}</style>
    </div>
  );
};

export default ThankYou;
