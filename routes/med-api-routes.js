var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the meds
    app.get("/api/meds", function(req, res) {
      var query = {};
      if (req.query.user_id) {
        query.UserId = req.query.user_id;
      }
      // 1. Add a join here to include all of the Users to these meds
      db.Med.findAll({
        include: [ db.User ],
        where: query
      }).then(function(dbMed) {
        res.json(dbMed);
      });
    });
  
    // Get route for retrieving a single med
    app.get("/api/meds/:id", function(req, res) {
      // 2. Add a join here to include the Users who take the Med
      db.Med.findOne({
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
    app.post("/api/meds", function(req, res) {
      db.Med.create(req.body).then(function(dbMed) {
        res.json(dbMed);
      });
    });
  
    // DELETE route for deleting meds
    app.delete("/api/meds/:id", function(req, res) {
      db.Med.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbMed) {
        res.json(dbMed);
      });
    });
  
    // PUT route for updating meds
    app.put("/api/meds", function(req, res) {
      db.Med.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function(dbMed) {
          res.json(dbMed);
        });
    });
  };
  