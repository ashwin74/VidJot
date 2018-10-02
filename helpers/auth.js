//module.exports allows us to access it from other files.
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    //passport
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/login');
  }
}