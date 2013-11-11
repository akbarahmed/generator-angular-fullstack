module.exports = function(app, passport, auth) {
  var api = require('../controllers/api');
  app.get('/api/awesomeThings', api.awesomeThings);
};

