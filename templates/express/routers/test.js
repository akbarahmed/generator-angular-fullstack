/**
 * Test router
 */
module.exports = function(app, passport, auth) {
  var test = require('../controllers/test');
  app.get('/test', test.index);
};

