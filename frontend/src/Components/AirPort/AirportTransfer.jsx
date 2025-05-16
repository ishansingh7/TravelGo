import React from 'react';
import './AirportTransfer.css';

const AirportTransfer = () => {
  return (
    <div className="transfer-container">
      <h2>Airport transfers made easy</h2>
      <div className="transfer-steps">
        <div className="left-section">
          <div className="step">
            <div className="icon car-icon" />
            <div>
              <h4>Booking your airport taxi</h4>
              <p>Confirmation is immediate. If your plans change, you can cancel for free up to 24 hours before your scheduled pick-up time</p>
            </div>
          </div>
          <div className="step">
            <div className="icon driver-icon" />
            <div>
              <h4>Meeting your driver</h4>
              <p>You'll be met on arrival and taken to your vehicle. Your driver will track your flight, so they'll wait for you even if it's delayed</p>
            </div>
          </div>
          <div className="step">
            <div className="icon destination-icon" />
            <div>
              <h4>Arriving at your destination</h4>
              <p>Get to your destination quickly and safely – no waiting in line for a taxi, no figuring out public transport</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="how-it-works">How does it work?</div>
          <div className="flow">
            <div className="flow-step">Book online</div>
            <div className="flow-step">Receive confirmation</div>
            <div className="flow-step">Meet your driver</div>
            <div className="flow-step">Arrive at your destination</div>
          </div>
          <div className="end">Enjoy your trip!</div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransfer;
