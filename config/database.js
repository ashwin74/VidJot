if (process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI: 'mongodb://ashwin:ashwin7@ds017886.mlab.com:17886/vidjot-prod' }
} else {
  module.exports = { mongoURI: 'mongodb://localhost/vidjot-dev' }
}