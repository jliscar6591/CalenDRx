var db = require("../models");
var router = require("express").Router();
var NewUser = require("../models").NewUser;
var passport = require("passport");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
      // 1. Add a join to include all of each Author's Posts
      db.User.findAll({
        include: [ db.Med ]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  
    app.get("/api/users/:id", function(req, res) {
      // 2. Add a join to include all of the Author's Posts here
      db.User.findOne({
        include: [ db.Med ],
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  
    app.post("/api/users", function(req, res) {
      db.User.create(req.body).then(function(dbUser) {
        res.json(dbUser);
      });
    });
  
    app.delete("/api/users/:id", function(req, res) {
      db.Users.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUsers) {
        res.json(dbUsers);
      });
    });
  
  };

  router.post('/register', function (req, res){
    NewUser.create({
      email: req.body.email,
      password: req.body.password
    }).then(function (){
        res.redirect('/')
      });
  }); 

  router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if (err) return next(err);

      if (!user) return res.redirect('/');

      req.logIn(user, function(err){
        if (err) return next(err);
        console.log(user);
    return res.redirect('/');
      });
    })(req, res, next);
  });


  