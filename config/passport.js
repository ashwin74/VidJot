const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User modal
require('../models/User');
const User = mongoose.model('users');

//done is a callback which should be called after authenticating.
module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
      //Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'No User Found' });
        }

        //match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password Incorrect' });
          }
        })
      })
    }));

    //Serialize and DeSerialize
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      //mongoose function
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}