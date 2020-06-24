const mongoose = require('mongoose');

//User schema
const airplaneSchema = mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    flightType: {
        type: String,
        required: true
    },
    seatsAmount: {
        type: String,
        required: true
    },
    lagguagePrice: {
        type: String,
        required: true
    },
    seatPriceAdult: {
        type: String,
        required: true
    },
    seatPriceKid: {
        type: String,
        required: true
    },
    seatPriceBaby: {
        type: String,
        required: true
    }
});

const Airplane = module.exports = mongoose.model('Airplane', airplaneSchema, 'airplanes');