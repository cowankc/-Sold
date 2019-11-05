var db = require("../models");

module.exports = function(app) {
  // USERS
  // Get a user by username and password
  app.get("/api/user/:name/:password", function(req, res) {
    db.User.findOne(
      { 
        where: { 
                  name: req.params.name,
                  password: req.params.password
                }
      }).then(function(dbUser) {
        res.json(dbUser);
    });
  });

  // Add a new user
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Update a user by id
  app.put("/api/user/:id", function(req, res) {
    db.User.update({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  // MEALS
  // Get all meals
  app.get("/api/meals", function(req, res) {
    db.Meal.findAll({}).then(function(dbMeals) {
      res.json(dbMEals);
    });
  });

  // Add a new meal
  app.post("/api/meal", function(req, res) {
    db.Meal.create(req.body).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });

  // Update a meal by id
  app.put("/api/meal/:id", function(req, res) {
    db.Meal.update({ where: { id: req.params.id } }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });

  // Delete a meal by id
  app.delete("/api/meal/:id", function(req, res) {
    db.Meal.destroy({ where: { id: req.params.id } }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });


  // Reviews
  // Get all reviews for a chef
  app.get("/api/review/:chefId", function(req, res) {
    db.Review.findOne(
      { 
        where:  { 
                  id: chefId
                } 
      }).then(function(dbReview) {
        res.json(dbReview);
    });
  });

  // Get all reviews from a user
  app.get("/api/review/:userId", function(req, res) {
    db.Review.findOne(
      { 
        where:  { 
                  id: userId
                } 
      }).then(function(dbReview) {
        res.json(dbReview);
    });
  });

  // Add a new review
  app.post("/api/review/:userId", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};