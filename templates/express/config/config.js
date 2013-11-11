var _ = require('underscore');

// Load app configuration

var _env = (typeof process.env.NODE_ENV === 'undefined') ? 'development' : process.env.NODE_ENV;

module.exports = _.extend(
    require(__dirname + '/env/all.js'),
    require(__dirname + '/env/' + _env + '.json') || {}
);
