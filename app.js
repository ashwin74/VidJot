//SERVER
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const passport = require('passport');

//initialise express
const app = express();

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport Config
require('./config/passport')(passport);
//DB Config
const db = require('./config/database');

//map global promise - get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
  //Promise
  .then(() => console.log('MongoDB Connected...'))
  //if error
  .catch(err => console.log(err));

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//method-override middleware - override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//express-session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Right after express-session middleware.
//Passport middleware.
app.use(passport.initialize());
app.use(passport.session());

//connect-flash middleware
app.use(flash());

//Global Variable
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//index Route----GET Request
app.get('/', (req, res) => {
  const title = 'Welcome';
  //to send response to browser
  res.render('index', {
    title: title
  });
});

//about Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Use routes.
app.use('/ideas', ideas);
app.use('/users', users);

const port = process.env.PORT || 5000;

//ES6
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//using const instead of var because const is ES6 Syntax
/** app.listen(port, function() {
   console.log('Server started on port '+ port);
 });  THIS IS SAME AS above ONE WHICH IS ES6.**/