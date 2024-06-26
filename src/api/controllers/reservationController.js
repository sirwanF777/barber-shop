// controllers/reservationController.js
const Reservation = require('../models/Reservation');
const ApiError = require('../utils/ApiError');

const createReservation = async (req, res, next) => {
  const { reservationTime, description } = req.body;
  const userId = req.userId;

  try {
    const newReservation = new Reservation({
      userId,
      reservationTime,
      description,
    });
    await newReservation.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
};
