const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

//Load User model
require('../models/User');
const User = mongoose.model('users');

//User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

//User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

//Login Form POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Register Form POST
router.post('/register', (req, res) => {
  //console.log(req.body);
  let errors = [];
  if (req.body.password != req.body.password2) {
    errors.push({ text: 'Passwords do not match' });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: 'Password must be atleast 4 characters' });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email })
      .then(user => {
        //if there is a user with this email.
        if (user) {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //set password to hash.
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Your now Registered and can login');
                  res.redirect('/users/login');
                  console.log(newUser);
                })
                .catch(err => {
                  console.log(err);
                  return;
                })
            });
          });
        }
      });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;