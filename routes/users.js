const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/', function (req, res) {
    const sample = () => {
        return 'proba'
    }
    res.render('index', {
        pageTitle: "System rezerwacji lotów"
    });
});
//Registration proccess
router.post("/", (req, res) => {
    const login = req.body.loginValue;
    const password = req.body.passValue;
    const password_2 = req.body.passValue_2;
    const name = req.body.nameValue;
    const surname = req.body.surnameValue;
    const email = req.body.emailValue;

    //validation
    req.checkBody('loginValue', 'Login is required').notEmpty();
    req.checkBody('passValue', 'Password is required').notEmpty();
    req.checkBody('passValue_2', 'Passwords do not match').equals(req.body.passValue);
    req.checkBody('nameValue', 'Name is required').notEmpty();
    req.checkBody('surnameValue', 'Surname is required').notEmpty();
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
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('index');
                    }
                });
            });
        });
    }
});

// Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'index',
      failureFlash: true
    })(req, res, next);
  });
  
  // logout
  router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('index');
  });
  
  module.exports = router;