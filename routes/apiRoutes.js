var db = require("../models");

module.exports = function(app) {
  // USERS
  // Get a user by username and password
  app.get("/api/user/:name/:password", function(req, res) {
    db.user.findOne({ where: {userName: req.params.name, password: req.params.password}}).then(function(dbUser) {
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  // Add a new user
  app.post("/api/user", function(req, res) {
    console.log(req.body);
    db.user.create(
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      }).then(function(dbUser) {
     res.redirect('/swipe')
    });
  });

  // Update a user by id
  app.put("/api/user/:id", function(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    db.user.update(
      { 
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      },
      { where: {id: req.params.id} }
      ).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    console.log(req.params.id);
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  // MEALS
  // Get all meals
  app.get("/api/meals", function(req, res) {
    db.meal.findAll({}).then(function(dbMeals) {
      console.log(dbMeals[0].dataValues);
      res.json(dbMeals);
    });
  });

  // Add a new meal
  app.post("/api/meal/:chefId", function(req, res) {
    console.log(req.body);
    console.log(req.params.chefId);
    db.meal.create(
      {
        mealName: req.body.mealName,
        ingredients: req.body.ingredients,
        price: req.body.price,
        address: req.body.address,
        category: req.body.category,
        chefId: req.params.chefId
      }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });

  // Update a meal by id
  app.put("/api/meal/:id", function(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    db.meal.update(
      {
        mealName: req.body.mealName,
        ingredients: req.body.ingredients,
        price: req.body.price,
        address: req.body.address,
        category: req.body.category,
        chefId: req.body.chefId 
      },
      {
        where: { id: req.params.id } }
      ).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });

  // Delete a meal by id
  app.delete("/api/meal/:id", function(req, res) {
    console.log(req.params.id);
    db.meal.destroy({ where: { id: req.params.id } }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });


  // Reviews
  // Get all reviews for a chef
  app.get("/api/review/chef/:chefId", function(req, res) {
    db.review.findAll({ where: { chefId: req.params.chefId } }).then(function(dbReview) {
      console.log(dbReview);
      res.json(dbReview);
    });
  });

  // Get all reviews from a user
  app.get("/api/review/user/:userId", function(req, res) {
    db.review.findAll({ where: { userId: req.params.userId } }).then(function(dbReview) {
      console.log(dbReview);
      res.json(dbReview);
    });
  });

  // Add a new review by a user
  app.post("/api/review/:userId", function(req, res) {
    console.log(req.body);
    console.log(req.params.userId);
    db.review.create(
      {
        rating: req.body.rating,
        comment: req.body.comment,
        chefId: req.body.chefId,
        userId: req.params.userId
      }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};