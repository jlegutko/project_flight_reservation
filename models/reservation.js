const mongoose = require('mongoose');

//User schema
const reservationSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    flightDate: {
        type: String,
        required: true
    },
    flightDestination: {
        type: String,
        required: true
    },
    adultSeats: {
        type: String,
        required: false
    },
    kidSeats: {
        type: String,
        required: false
    },
    babySeats: {
        type: String,
        required: false
    },
    seatIds: {
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');