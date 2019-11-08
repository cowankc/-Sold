var db = require("../models");

module.exports = function(app) {
  // Get all meals and Route to home page 
  app.get("/", function(req, res) {
    db.meal.findAll({}).then(function(dbMeals) {
      // console.log(dbMeals[0].dataValues);
      res.render("homepage", {
        meals: dbMeals
      });
    });
  });

  // Load mela page
  app.get("/mealpage", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("mealpage", {
        msg: "meal page!",
        examples: dbExamples
      });
    });
  });
  

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  // Search by meal name and route to meal page
  app.get("/meal/:name", function(req, res) {
    db.meal.findOne({ where: { mealName: req.params.name } }).then(function(dbMeal) {
      console.log(dbMeal.dataValues);
      res.render("mealpage", {
        meal: dbMeal
      });
    });
  });

  // Route to Login Page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
