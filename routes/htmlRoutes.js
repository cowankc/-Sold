var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("homepage", {
        msg: "Welcome!",
        meals: dbMeals
      });
    });
  });

  // Load meal page by id
  app.get("/meal/:id", function(req, res) {
    db.Meal.findOne({ where: { id: req.params.id } }).then(function(dbMeals) {
      res.render("meal", {
        meal: dbMeals
      });
    });
  });

  // Load review page by chef id
  app.get("/review/:chefId", function(req, res) {
    db.Review.findOne({ where: { id: req.params.chefId } }).then(function(dbReviews) {
      res.render("review", {
        review: dbReviews
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
