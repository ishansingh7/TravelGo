const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelName: String,
  hotelLocation: String,
  hotelPrice: Number,
  hotelRating: Number,
  bookingName: String,
  bookingPhone: String,
  bookingEmail: String,
  bookingCheckIn: String,
  bookingCheckOut: String,
  bookingGuests: Number,
  totalCost: Number,
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: 'Pending',
  },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Uncomment if using
});

module.exports = mongoose.model('HotelBooking', bookingSchema);