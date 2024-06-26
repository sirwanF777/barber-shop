const express = require('express');
const { createReservation } = require('../../../controllers/reservationController');
const { verifyToken } = require('../../../middlewares/userAuth');
const router = express.Router();

router.post(
    '/reserve', 
    [ verifyToken, createReservation ]
);

module.exports = router;
