const express = require('express');
const router = express.Router();
const Booking = require('../models/TourBooking');

// Utility to generate a mock confirmation number
const generateConfirmationNumber = () => {
  return 'CONF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

router.post('/', async (req, res) => {
  try {
    const {
      tourId,
      travelers,
      contact,
      paymentMethod,
      paymentDetails,
      totalCost
    } = req.body;

    const confirmationNumber = generateConfirmationNumber();

    const newBooking = new Booking({
      tourId,
      travelers,
      contact,
      paymentMethod,
      paymentDetails,
      totalCost,
      confirmationNumber
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking successful',
      confirmationNumber
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Failed to process booking' });
  }
});

module.exports = router;
