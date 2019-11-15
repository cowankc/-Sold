# Project 2

![alt text](https://github.com/XXX "Logo")

##What's Cookin'

 - [x] Requirements

     - [x] Express Web Server

     - [X] MySql Data Base
     
     - [x] ORM

     - [x] Retrieve (GET)

     - [x] Add data (POST)

     - [x] New technology

     - [x] Frontend UI

     - [x] MVC structure
      
- [x] Application

     - [x] Allow users to register, login, and logout of account

     - [x] Allow users registered as chef post, edit, and delete meals
     
     - [x] Allow users to swipe on meals (or click function) to be redirected to mealpage and added to cart

     - [x] Allow mobile responsiveness for user experience

## Prerequisites

   - [DotEnv](https://www.npmjs.com/package/dotenv)

   - [Express](https://www.npmjs.com/package/express)

  - [Handlebars](https://www.npmjs.com/package/express-handlebars)

  - [Express-Handlebars](https://www.npmjs.com/package/handlebars)
  
  - [Express-handlebars](https://www.npmjs.com/package/express-handlebars)

## Technologies Used
- Node
- Express Web Server
- Sequelize ORM
- MySQL Database
- JQuery
- Javascript
- Handlebars
- Limited CSS

## New Technology

  - [JSON Web Token](https://jwt.io/)

  - [Materialize](https://materializecss.com/)

  - [Heroku](https://id.heroku.com/)

## Improvement Features

- [ ] Working checkout page that is able to take payments
- [ ] Ability to send confirmation emails upon payment
- [ ] Displaying 5-star rating average of chefs based on meal likes
- [ ] Ability to post future meals using a calendar system
- [ ] Subscription ability for selected chefs to obtain notifications about new meals
- [ ] Order history page

## Content Flow

### Unregistered User
1. Click "Let's Eat" link on main page
- Be redirected to swipe page

2. Register as a user
- Click "Login" at top of main page
- Click register as a new user
- Sign up as a chef or user
- Send login data to mySQL database

### Registered User
1. Click "Login" at top of main page
- Login to user account
- Be redirected to swipe page
- Swipe right to be redirected to item meal page

2. Meal Page
- Click thumbs up or thumbs down to to rank meal and store data in mySQL database
- Click add to cart button to add item to cart
- Display name and main ingredients of selected meal

### Registered Chef
1. Click "Login" at top of main page
- Login to user account
- Be redirected to chef index page

2. Chef Page
- Add a new meal to chef page including picture, price, name, ingredients, and location
- Edit and delete meals on chef page that have already been registered
- Send meal data to mySQL database

## Visual Overview 

![alt text](https://github.com/XXX "Logo")