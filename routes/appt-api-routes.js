var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the appointments
    app.get("/api/appts", function(req, res) {
      var query = {};
      if (req.query.user_id) {
        query.UserId = req.query.user_id;
      }
      // 1. Add a join here to include all of the Users to these appointments
      db.Appt.findAll({
        include: [ db.User ],
        where: query
      }).then(function(dbAppt) {
        res.json(dbAppt);
      });
    });
  
    // Get route for retrieving a single med
    app.get("/api/appts/:id", function(req, res) {
      // 2. Add a join here to include the Users who take the Med
      db.Appt.findOne({
         include: [ db.User ],
         where: {
           id: req.params.id
         }
      }).then(function(dbUser) {
         console.log(dbUser);
        res.json(dbUser);
       });
     });
  
     // POST route for saving a new med
   app.post("/api/appts", function(req, res) {
      db.Appt.create(req.body).then(function(dbAppt) {        
      	res.json(dbAppt);
      });
     });
  
     // DELETE route for deleting meds
    app.delete("/api/appts/:id", function(req, res) {
      db.Appt.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbAppt) {
        res.json(dbAppt);
      });
    });
  
    // PUT route for updating meds
    app.put("/api/appts", function(req, res) {
      db.Appt.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function(dbAppt) {
          res.json(dbAppt);
        });
    });
  };