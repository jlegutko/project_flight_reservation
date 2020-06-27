const bodyparser = require("body-parser");
const express = require("express");
// Bring in models
let User = require('./models/user');
let Airplane = require('./models/airplane');
let Reservation = require('./models/reservation');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('./config/database');
const session = require('express-session');
var expressValidator = require('express-validator');
const db = "mongodb+srv://admin:Student12345@flightreservationproject-r4ckv.mongodb.net/flightReservation?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// Init app
const app = express();

 // session middleware
// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
app.use(require('flash')());
 
app.use(function (req, res, next) {
  // flash a message
  req.flash('info', 'hello!');
  next();
})

app.use(expressValidator())
mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error", err);
    }
});
const path = require('path');

//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//session if user is not null
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });
  
  


app.use('/assets', express.static(path.join(__dirname, "./assets")));
//podpięcie js
app.use('/js', express.static(path.join(__dirname, "./js")));
//baza dodanie uzytkownika
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//app.use(flash());
//kod JS
//ustawienie, ze moja aplikacja musi korzystac z silnika hbs
app.set("view engine", 'hbs')

//wyrenderowanie strony, gdy uzytkownik wchodzi na stronę
app.get('/', function (req, res) {
    const sample = () => {
        return 'proba'
    }
    res.render('index', {
        pageTitle: "System rezerwacji lotów"
    });
});

//post register
app.post("/", (req, res) => {
    const login = req.body.loginValue;
    const password = req.body.passValue;
    const name = req.body.nameValue;
    const surname = req.body.surnameValue;
    const email = req.body.emailValue;

    //validation
    req.checkBody('loginValue', 'Login is required').notEmpty();
    req.checkBody('passValue', 'Password is required').notEmpty();
    req.checkBody('passValue_2', 'Passwords do not match').equals(req.body.passValue);
    req.checkBody('nameValue', 'Name is required').notEmpty();
    req.checkBody('surnameValue', 'Surname is required').notEmpty();
    req.checkBody('emailValue', 'Email is required').notEmpty();
    req.checkBody('emailValue', 'Email is not valid').isEmail();
 
    let errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            errors: errors
        });
    } else {
        let newUser = new User({
            login: login,
            password: password,
            name: name,
            surname: surname,
            email: email
        });

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.redirect('/');
                    }
                });
            });
        });
    }
});

//post reservation success
app.post("/reservation_succed", (req, res) => {
    const login = req.user.login;
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

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//searchTool

app.post("/reservation", (req, res) => {
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

//post login
app.post("/login", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

//user logout
app.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
  });

//server
app.listen(port, (err) => {
    if (err) {
        return console.log("coś poszło nie tak...:", err)
    }
    console.log("serwer działa na porcie", port)
});
