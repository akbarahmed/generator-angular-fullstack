'use strict';

// Module dependencies.
var express  = require('express'),
    path     = require('path'),
    exphbs   = require('express3-handlebars'),
    fs       = require('fs'),
    passport = require('passport');

// Exponential: Authorization middleware
var auth = require('./lib/middleware/authorization');

var app = express();

// Exponential: Handlebars
app.set('views', './lib/views');

app.engine('html', exphbs({
    extname       : '.html',
    layoutsDir    : './lib/views/layouts',
    defaultLayout : 'main'
}));

app.set('view engine', 'html');

// Mongo: Connect to database
var db = require('./lib/db/mongo');

// Mongo: Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Mongo: Populate empty DB with dummy data
require('./lib/db/dummydata');

// Passport: Bootstrap configuration
require('./lib/config/passport')(passport);

// Controllers
var api = require('./lib/controllers/api');

// Express Configuration
app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
    // Use Passport sessions
    app.use(passport.initialize());
    app.use(passport.session());
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Bootstrap routers
var routesPath = __dirname + '/lib/routers';

var loadRoutes = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var routerPath = path + '/' + file;
        var stat = fs.statSync(routerPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$)/.test(file)) {
                console.log('Exponential: Loading router ' + routerPath);
                require(routerPath)(app, passport, auth);
            }
        } else if (stat.isDirectory()) {
            loadRoutes(routerPath);
        }
    });
};

loadRoutes(routesPath);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
