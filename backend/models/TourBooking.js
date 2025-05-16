const mongoose = require('mongoose');

const travelerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,
});

const bookingSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Tour'
  },
  travelers: [travelerSchema],
  contact: {
    email: String,
    phone: String,
    countryCode: String
  },
  paymentMethod: String,
  paymentDetails: mongoose.Schema.Types.Mixed,
  totalCost: Number,
  confirmationNumber: String,
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
