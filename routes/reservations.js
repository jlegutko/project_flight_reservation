const express = require('express');
const router = express.Router();

// Article Model
let Reservation = require('../models/reservation');
// User Model
let User = require('../models/user');
// Airplane Model
let Airplane = require('../models/airplane');



//post reservation success
router.post("/reservation_succed", ensureAuthenticated, (req, res) => {
    const login = req.user._id;
    const flightDate = req.body.flightDate;
    const flightDestination = req.body.flightDestination;
    const adultSeats = req.body.seatsAmountAdult;
    const kidSeats = req.body.seatsAmountKid;
    const babySeats = req.body.seatsAmountBaby;
    const luggage = req.body.lagguageType;
    const seatIds = req.body.seatIds;

    let errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            errors: errors
        });
    } else {
        let newReservation = new Reservation({
            login: login,
            flightDate: flightDate,
            flightDestination: flightDestination,
            adultSeats: adultSeats,
            kidSeats: kidSeats,
            babySeats: babySeats,
            luggage: luggage,
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
    }
});

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/');
    }
  }
  
  module.exports = router;
