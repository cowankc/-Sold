var db = require("../models");
//needed for random
var Sequelize = require('sequelize');

module.exports = function(app) {
  // Get all meals and Route to home page 
  app.get("/", function(req, res) {
    db.Meal.findAll({ order: Sequelize.literal('rand()') }).then(function(dbMeals) {
      res.render("homepage", {
        meals: dbMeals
      });
    });
  });

  // Search by meal name and route to meal page
  app.get("/meal/:id", function(req, res) {
    db.Meal.findOne({ where: { id: req.params.id } }).then(function(dbMeal) {
      console.log(dbMeal.dataValues);
 
      let ingredients = dbMeal.ingredients;
      let split = ingredients.split(",")
      
      res.render("mealpage", {
        meal: dbMeal,
        ingredients: split
      });
    });
  });

  // Route to Login Page
  app.get("/login", function(req, res) {
    res.render("auth/login");
  });

  app.get("/register", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("auth/register", {
        msg: "register",
        examples: dbExamples
      });
    });
  });

  app.get("/meals", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("user/mealpage", {
        msg: "meals on meals",
        examples: dbExamples
      });
    });
  });

  app.get("/swipe", function(req, res) {
    db.Meal.findAll({ order: Sequelize.literal('rand()')}).then(function(dbMeals) {
      return dbMeals 
    }).then(function(dbMeals){
      const promises = dbMeals.map(async function (dbMeal){
        const user = await db.User.findOne({ where: { id: dbMeal.UserId }}) 
        return {...dbMeal, user}
      })
      return Promise.all(promises)
    }).then(function(dbMeals) {
      res.render("user/swipe", {
        msg: "swipe",
        meals: dbMeals,
      });
      console.log(dbMeals);
    })
  });

  app.get("/dashboard", function(req, res) {
    db.Example.findAll().then(function(dbExamples) {
      res.render("chef/dashboard", {
        msg: "dashboard",
        examples: dbExamples
      });
    });
  });

  app.get("/cart", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("cart", {
        msg: "this is the shopping cart page",
        examples: dbExamples
      });
    });
  });

  app.get("/mealpage", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("mealpage", {
        msg: "mealpage",
        examples: dbExamples
      });
    });
  });

  app.get("/chef/meals/:email", function(req, res) {
    db.User.findAll({
      where: {
        email: req.params.email
        },
        include: [db.Meal]
  }).then(function(chefInfo) {
      res.render("chef/meals/index", {
        msg: "meals index",
        chefInfo: chefInfo,
        meals: chefInfo[0].dataValues.Meals
      });
      // console.log(chefInfo[0].dataValues.Meals[0])
    });
  });

  app.get("/chef/newmeal/:email", function(req, res) {
    res.render("chef/meals/newmeal");
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};