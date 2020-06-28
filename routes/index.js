const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Airplane = require('../models/airplane');
const Reservation = require('../models/reservation');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Search tool, only for registered and logged in
router.post("/reservation", ensureAuthenticated, (req, res) => {
    const flightDate1 = req.body.flightDate;
    const flightDestination1 = req.body.flightDestination;
    Airplane.findOne({ flightType: flightDestination1 }, function (err, airplane) {
        if (err) {
            console.log("Error");
        } else {
            Reservation.find({flightDestination: flightDestination1, flightDate: flightDate1}, function (err, reservations) {
                if (err) {
                    console.log("Error");
                } else {
                    var air = airplane;
                    res.render('reservation', {
                        pageTitle: "Strona rezerwacji",
                        flightDate: flightDate1,
                        flightDestination: flightDestination1,
                        air: air,
                        reservations: reservations
                    });
                }
            });
        }
    });
});

// Reservation completion
router.post("/reservation_succed", ensureAuthenticated, (req, res) => {
    const login = req.user.id;
    const flightDate = req.body.flightDate;
    const flightDestination = req.body.flightDestination;
    const adultSeats = req.body.seatsAmountAdult;
    const kidSeats = req.body.seatsAmountKid;
    const babySeats = req.body.seatsAmountBaby;
    const seatIds = req.body.seatIds;


    let newReservation = new Reservation({
        login: login,
        flightDate: flightDate,
        flightDestination: flightDestination,
        adultSeats: adultSeats,
        kidSeats: kidSeats,
        babySeats: babySeats,
        seatIds: seatIds
    });

    newReservation.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }


    });
});

// Page for logged in
router.get('/index_logged', ensureAuthenticated, (req, res) =>
  res.render('index_logged', {
    user: req.user
  })
);

module.exports = router;