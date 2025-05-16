import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUser, FaPhone, FaCreditCard, FaEnvelope, FaLock, FaArrowLeft,
  FaCheckCircle, FaMoneyBillWave, FaMapMarkerAlt
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './TourBookingDetails.css';

const TourBookingDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { tour } = state || {};

  const [travelers, setTravelers] = useState([{ firstName: '', lastName: '', gender: '', dateOfBirth: '' }]);
  const [contact, setContact] = useState({ email: '', phone: '', countryCode: '+91' });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [netBankingBank, setNetBankingBank] = useState('');
  const [walletDetails, setWalletDetails] = useState({ provider: '', phone: '' });

  const [bookingStatus, setBookingStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (tour && travelers.length > 0) {
      setTotalCost(tour.budget * travelers.length);
    }
  }, [tour, travelers.length]);

  if (!tour) return <p>No tour selected for booking.</p>;

  const handleTravelerChange = (index, field, value) => {
    const updated = [...travelers];
    updated[index][field] = value;
    setTravelers(updated);
  };

  const addTraveler = () => {
    setTravelers([...travelers, { firstName: '', lastName: '', gender: '', dateOfBirth: '' }]);
  };

  const removeTraveler = (index) => {
    if (travelers.length > 1) {
      const updated = travelers.filter((_, i) => i !== index);
      setTravelers(updated);
    }
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setBookingStatus('');

    if (!tour || !tour._id) {
      setBookingStatus('Invalid tour information.');
      setLoading(false);
      return;
    }

    let paymentDetails = {};
    if (paymentMethod === 'credit-card') {
      const { cardNumber, expiry, cvv } = cardDetails;
      if (!cardNumber || !expiry || !cvv) {
        setBookingStatus('Please fill in all card details.');
        setLoading(false);
        return;
      }
      paymentDetails = cardDetails;
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        setBookingStatus('Please provide a UPI ID.');
        setLoading(false);
        return;
      }
      paymentDetails = { upiId };
    } else if (paymentMethod === 'net-banking') {
      if (!netBankingBank) {
        setBookingStatus('Please select a bank for net banking.');
        setLoading(false);
        return;
      }
      paymentDetails = { bank: netBankingBank };
    } else if (paymentMethod === 'wallet') {
      const { provider, phone } = walletDetails;
      if (!provider || !phone) {
        setBookingStatus('Please provide wallet details.');
        setLoading(false);
        return;
      }
      paymentDetails = walletDetails;
    } else if (paymentMethod === 'cod') {
      paymentDetails = { method: 'Cash on Delivery' };
    }

    const bookingData = {
      tourId: tour._id,
      travelers,
      contact,
      paymentMethod,
      paymentDetails,
      totalCost
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tour-bookings', bookingData);
      setTimeout(() => {
        setLoading(false);
        setBookingStatus(`Booking successful! Confirmation #: ${response.data.confirmationNumber}`);
        setSuccess(true);
        setShowSuccessPopup(true);
      }, 3000);
    } catch (err) {
      console.error(err);
      setBookingStatus('Error booking tour. Please try again.');
      setSuccess(false);
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="tour-booking-container">
      <h1 className="booking-heading">Complete Your Tour Booking</h1>

      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Processing payment...</p>
        </div>
      )}

      {showSuccessPopup && (
        <div className="payment-successful-popup show">
          <FaCheckCircle size={32} color="#10b981" />
          <p>{bookingStatus}</p>
          <button className="close-btn" onClick={() => setShowSuccessPopup(false)}>Close</button>
        </div>
      )}

      <div className="booking-summary">
        <h2><FaMapMarkerAlt /> Tour Summary</h2>
        <p><strong>Destination:</strong> {tour.country}</p>
        <p><strong>Description:</strong> {tour.description}</p>
        <p><FaMoneyBillWave /> <strong>Budget per person:</strong> ₹{tour.budget}</p>
        <p><strong>Meal Type:</strong> {tour.mealType}</p>
        <p><strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}</p>
        <p><strong>Total Travelers:</strong> {travelers.length}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>
      </div>

      <button onClick={goBack} className="back-btn"><FaArrowLeft /> Go Back</button>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Traveler Information</h2>
        {travelers.map((traveler, i) => (
          <div key={i} className="traveler-group">
            <label><FaUser /> Traveler {i + 1}</label>
            <input type="text" placeholder="First Name" value={traveler.firstName} onChange={(e) => handleTravelerChange(i, 'firstName', e.target.value)} required />
            <input type="text" placeholder="Last Name" value={traveler.lastName} onChange={(e) => handleTravelerChange(i, 'lastName', e.target.value)} required />
            <select value={traveler.gender} onChange={(e) => handleTravelerChange(i, 'gender', e.target.value)} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="date" value={traveler.dateOfBirth} onChange={(e) => handleTravelerChange(i, 'dateOfBirth', e.target.value)} required />
            {travelers.length > 1 && (
              <button type="button" onClick={() => removeTraveler(i)} className="remove-btn">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addTraveler} className="add-btn">Add Traveler</button>

        <h2>Contact Information</h2>
        <div className="contact-group">
          <label><FaEnvelope /> Email</label>
          <input type="email" value={contact.email} onChange={(e) => handleContactChange('email', e.target.value)} required />
          <label><FaPhone /> Phone</label>
          <div className="phone-input">
            <select value={contact.countryCode} onChange={(e) => handleContactChange('countryCode', e.target.value)}>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+86">+86 (China)</option>
            </select>
            <input type="tel" value={contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} required />
          </div>
        </div>

        <h2>Payment Details</h2>
        <div className="payment-group">
          {['credit-card', 'net-banking', 'upi', 'wallet', 'cod'].map(method => (
            <label key={method}>
              <input type="radio" value={method} checked={paymentMethod === method} onChange={handlePaymentChange} /> {method.replace('-', ' ').toUpperCase()}
            </label>
          ))}

          {paymentMethod === 'credit-card' && (
            <div className="card-details">
              <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => handleCardChange('cardNumber', e.target.value)} required />
              <input type="text" placeholder="Expiry (MM/YY)" value={cardDetails.expiry} onChange={(e) => handleCardChange('expiry', e.target.value)} required />
              <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => handleCardChange('cvv', e.target.value)} required />
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="card-details">
              <input type="text" placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            </div>
          )}

          {paymentMethod === 'net-banking' && (
            <div className="card-details">
              <select value={netBankingBank} onChange={(e) => setNetBankingBank(e.target.value)} required>
                <option value="">Select Bank</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="SBI">SBI</option>
                <option value="AXIS">Axis Bank</option>
              </select>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="card-details">
              <select value={walletDetails.provider} onChange={(e) => setWalletDetails({ ...walletDetails, provider: e.target.value })} required>
                <option value="">Select Wallet</option>
                <option>Paytm</option>
                <option>PhonePe</option>
                <option>GooglePay</option>
                <option>Mobikwik</option>
              </select>
              <input type="tel" placeholder="Mobile Number" value={walletDetails.phone} onChange={(e) => setWalletDetails({ ...walletDetails, phone: e.target.value })} required />
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="card-details">
              <p><strong>Note:</strong> Pay at destination or on arrival.</p>
            </div>
          )}
        </div>

        <button type="submit" className="book-submit-btn"><FaLock /> Confirm Booking</button>

        {bookingStatus && !bookingStatus.includes("successful") && (
          <p className="booking-status error">{bookingStatus}</p>
        )}
      </form>
    </div>
  );
};

export default TourBookingDetails;
