const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reservationTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
