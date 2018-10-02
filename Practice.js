//IN TERMINAL
node -v
npm -v
node
global
process
process.env.COMPUTERNAME
console.log('My computer name is ' + process.env.COMPUTERNAME)

//MONGODB
mongod --directoryperdb --dbpath C:\Program Files\MongoDB\Server\3.6\data\db --logpath C:\Program Files\MongoDB\Server\3.6\log\mongo.log --logappend --rest --install
//IN CONSOLE
window;
alert();


//VIDJOT - TERMINAL

npm install -g nodemon

//VidJot code

//how middleware works.
app.use(function(req, res, next) {
  console.log(Date.now());
  req.name = 'Ashwin';
  next();
});
//console.log(req.name);
