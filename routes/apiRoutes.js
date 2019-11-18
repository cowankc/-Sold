var db = require("../models");
var jwt = require("../public/js/verification.js");

module.exports = function(app) {
  // VERIFICATION
  // Get a user id by token
  app.post("/api/verify/:token", function(req, res) {
    let result = {};
    let isSuccess = false;
    let token = req.params.token;

    if (token !== null){

      //Verify token
      var verify = jwt.verify(token);

      if (verify) {
        //Decode token
        var decoded = jwt.decode(token);

        if (decoded !== null) {
          //Return token
          isSuccess = true;
          result.status = 200;
          result.userId = decoded.payload.userId;
        }
        else {
          isSuccess = false;
          result.status = 401;
          result.error = 'Authentication error';
        }
      }
      else {
        isSuccess = false;
        result.status = 401;
        result.error = 'Authentication error';
      }
    }
    else {
      isSuccess = false;
      result.status = 401;
      result.error = 'Authentication error';
    }

    res.json({success: isSuccess, data: result});
  });

  // USERS
  // Get a user by username and password
  app.post("/api/user/:email/:password", function(req, res) {
    let result = {};
    let isSuccess = false;

    db.User.findOne({ where: {email: req.params.email, password: req.params.password}})
    .then(function(dbUser) {

      if (dbUser !== null){

        //Get authorization token
        var token = jwt.sign(dbUser.dataValues.id);

        //Return token
        isSuccess = true;
        result.status = 200;
        result.id = dbUser.dataValues.id;
        result.token = token;
      }
      else {
        isSuccess = false;
        result.status = 401;
        result.error = 'Authentication error';
      }

      res.json({success: isSuccess, data: result, chef: dbUser.dataValues.chef});
    })
    .catch(function(err) {
      isSuccess = false;
      result.status = 404;
      result.error = err;
      res.json({success: isSuccess, data: result});
    })
  });

  // Add a new user
  app.post("/api/user", function(req, res) {
    let result = {};
    let isChef = 0;

    if(req.body.chef){
      isChef = 1;
    }

    db.User.create(
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        chef: isChef
      }).then(function(dbUser) {
        //Get Authorization Token
        // var token = jwt.sign(dbUser.dataValues.id);

        // //Return token
        // result.status = 200;
        // result.id = dbUser.dataValues.id;
        // result.token = token;

        // res.json({success: true, data: result});
        if(isChef){
          res.redirect('/chef/meals/:email')
        }else{
          res.redirect('/swipe')
        }
    });
  });

  // Update a user by id
  app.put("/api/user/:id", function(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    db.User.update(
      { 
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        chef: 0,
        chefRating: 0
      },
      { where: {id: req.params.id} }
      ).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function(req, res) {
    console.log(req.params.id);
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  // MEALS
  // Get all meals
  app.get("/api/meals", function(req, res) {
    db.Meal.findAll({}).then(function(dbMeals) {
      console.log(dbMeals[0].dataValues);
      res.json(dbMeals);
    });
  });

  //get only one meal
  app.get("/api/meal/:mealId", function(req, res) {
    db.Meal.find({ where: { id: req.params.mealId } }).then(function(dbMeal) {
      res.json({data: dbMeal});
    });
  });

  // Add a new meal
  app.post("/api/meal/:userId", function(req, res) {
    console.log(req.body);
    console.log(req.params.email);
    db.Meal.create(
      {
        mealName: req.body.mealName,
        photo: req.body.photo,
        ingredients: req.body.ingredients,
        price: req.body.price,
        address: req.body.address,
        category: req.body.category,
        UserId: req.body.id
      }).then(function(dbMeal) {
      // res.json(dbMeal);
      res.redirect('/chef/meals/:email')
    });
  });

  // Update a meal by id
  app.put("/api/meal/:id", function(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    db.Meal.update(
      {
        mealName: req.body.mealName,
        photo: req.body.photo,
        ingredients: req.body.ingredients,
        price: req.body.price,
        address: req.body.address,
        category: req.body.category,
        // chefId: req.body.chefId 
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
    db.Meal.destroy({ where: { id: req.params.id } }).then(function(dbMeal) {
      res.json(dbMeal);
    });
  });


  // Reviews
  // Get all reviews for a chef
  app.get("/api/review/chef/:chefId", function(req, res) {
    db.Review.findAll({ where: { chefId: req.params.chefId } }).then(function(dbReview) {
      console.log(dbReview);
      res.json(dbReview);
    });
  });

  // Get all reviews from a user
  app.get("/api/review/user/:userId", function(req, res) {
    db.Review.findAll({ where: { userId: req.params.userId } }).then(function(dbReview) {
      console.log(dbReview);
      res.json(dbReview);
    });
  });

  // Add a new review by a user
  app.post("/api/review/:userId", function(req, res) {
    console.log(req.body);
    console.log(req.params.userId);
    db.Review.create(
      {
        rating: req.body.rating,
        comment: req.body.comment,
        UserId: req.params.userId
      }).then(function(dbUser_Review) {
      res.json(dbUser_Review);
      db.User.update(
        { 
          chefRating: db.User.chefRating + db.Review.rating
        },
        { where: {id: db.meals.userId} }
        )
    });
  });
};