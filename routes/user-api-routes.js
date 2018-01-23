var db = require("../models");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
      
      db.User.findAll({
        include: [ db.Med ]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });

    app.get("/api/users/:name", function(req, res) {
 
      db.User.findAll({
        include: [ db.Med ],
        where: {
          name: req.params.name
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
      console.log(req.params);
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUsers) {
        res.json(dbUsers);
      });
    });
  
  };
  