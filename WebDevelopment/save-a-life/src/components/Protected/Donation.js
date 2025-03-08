import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(0);
    }
  };

  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  const donationAmount = customAmount || selectedAmount;
  
  // Navigate to ThankYou component with donation details
  navigate('/thank-you', {
    state: {
      name,
      amount: donationAmount,
    },
  });
};


  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="header-content">
            <span role="img" aria-label="Paw" className="icon">🐾</span>
            <h2>Save Wildlife</h2>
          </div>
          <p className="subtitle">Help Preserve Our Natural Heritage</p>
          <p>Your contribution helps protect endangered species and their habitats.</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="amount-buttons">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <label htmlFor="custom-amount">Custom Amount</label>
              <input
                id="custom-amount"
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter custom amount"
              />
            </div>

            <div className="user-details">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <button type="submit" className="donate-button" disabled={!email || !name || (!selectedAmount && !customAmount)}>
              Donate ₹{selectedAmount || customAmount || '0'}
            </button>
          </form>
        </div>

        <div className="card-footer">
          <p>Secure Payment • Tax Deductible • Making a Difference</p>
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
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        .card-header, .card-footer {
          margin-bottom: 24px;
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .icon {
          font-size: 40px;
          color: #ff9800;
        }
        h2 {
          margin-left: 12px;
          font-size: 28px;
          color: #388e3c;
        }
        .subtitle {
          font-size: 18px;
          color: #6c757d;
          font-weight: 600;
        }
        .amount-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 24px;
        }
        .amount-button {
          flex: 0 1 calc(50% - 10px);
          padding: 12px;
          border: 2px solid #388e3c;
          background: white;
          color: #388e3c;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .amount-button.selected, .amount-button:hover {
          background: #388e3c;
          color: white;
        }
        .custom-amount, .user-details {
          margin-bottom: 24px;
        }
        .custom-amount input, .user-details input {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          border: 1px solid #388e3c;
          border-radius: 8px;
        }
        .donate-button {
          width: 100%;
          padding: 16px;
          background: #388e3c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .donate-button:hover:enabled {
          background: #2e7d32;
          transform: translateY(-3px);
        }
        .donate-button:disabled {
          background: lightgray;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Donation;
