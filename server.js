// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require('express-session');
var Strategy = require("passport-local").Strategy;
var setup = require('./config/setup');

app.use(session({
	secret: setup.secret,
	proxy: true,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
	usernameField: 'email'
}, function(email, password, cb) {
	NewUser.findOne({
		where: {
			email: email
		}
	}).then(function(user) {
		if ( NewUser ) {
			// Check password
			if ( NewUser.password == password ) {
				cb(null, user);
			} else {
				cb(null, false);
			}
		} else {
			return cb(null, false);
		}
	}).catch(function(err) { 
		console.log('error');
		return cb(err) 
	});
}));

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	NewUser.findById(id).then(function(user) {
		cb(null, user);
	});
});

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/med-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});