// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var router = require('express').Router();

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

 
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/meds", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/meds.html"));
  });
  
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/addMed", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addMed.html"));
  });

};

// router.get('/', function(req.res){
//   if (req.user){

//   }else{

//   }
//   res.render('index',{NewUser: req.user})
// })