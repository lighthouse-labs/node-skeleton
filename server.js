"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
// we will need bcrypt and cookieSession in our package.json and express

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
// ******************************************************
// STANDARD CONSTANTS

const saltRounds = 10;



// ******************************************************
//USES

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.use(bodyParser.urlencoded({extended: true}));


// USES cookieSession
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }))

// ******************************************************
// FUNCTIONS

function generateRandomString(){
  let tempStr = "";
  const stringLength = 6
  const possibleLetters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < stringLength; i++){
      tempStr += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
    }
    return tempStr;
};

// function loginValidator (userName, loginPassword){

//   for (let userId in users){
//     const user = users[userId];

//     if (user.email === userName){
//       if (bcrypt.compareSync(loginPassword, user.password)) {
//         return user;
//       } else {
//         return false;
//       }
//     }
//   }
//   return false;
// };

// ******************************************************

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// PRE_LOGIN PAGE
// app.get("/", (req, res) => {
//   const userId = req.session.user_id  // pulls userId from body parser in the login field
//   const user = database[userId]; // pulls userId instance from users
//   const templateVars = { username : userId, pwd: password  } // packages
//   res.render("hardcode_frontpage");
// });

// loginValidator is commented out  ** WARNING!: THIS WILL BREAK **
app.put("/", (req, res) => {
  const userId = req.body.user_id;
  const userPassword = req.body.password;
  const foundUser = loginValidator(userId, userPassword)

// the login conditional - if TRUE, will redirect to user's personal page
// if FALSE, will direct to registration page
  if (userId && userPassword && foundUser){
    req.session.user_id = foundUser.id;
    res.redirect("/:user");
  } else {
    res.redirect("/registration");
  }
});

// REGISTRATION PAGE

// GET REGISTRATION
app.get("/registration", (req, res) => {
  const userId      = req.body.user_id;
  const password    = req.body.password;
  const firstName   = req.body.firstName;
  const lastName    = req.body.lastName;
  const address     = req.body.address;
  const email       = req.body.email;
  const phoneNumber = req.body.email;
  const DoB         = Date.req.body.date;
  const gender      = req.body.gender;
  const avatarURL   = req.body.avatarURL;

  const templateVars = {
// These OBJECT VARIABLE names will have to be adjusted later depending on DB
    userId      : userId,
    password    : encryptedPassword,
    firstName   : firstName,
    lastName    : lastName,
    address     : address,
    email       : email,
    phoneNumber : phoneNumber,
    DateOfBirth : DoB,
    gender      : gender,
    avatar      : avatarURL,
  }

  res.render("/registration", templateVars)
});

    // POST REGISTRATION
app.post("/registration", (req, res) => {
  const userId = req.body.user_id;
  const password = req.body.password;

  if (userId && password){
    const randomId = generateRandomString();
    const encryptedPassword = bcrypt.hashSync(password, saltRounds)
    const userObj = {

// *** keys need converting to DB standard variable names ***
      userId      : userId,
      password    : encryptedPassword,
      firstName   : firstName,
      lastName    : lastName,
      address     : address,
      email       : email,
      phoneNumber : phoneNumber,
      DateOfBirth : DoB,
      gender      : gender,
      avatar      : avatarURL,
    }

// do we need the randomId for cookieSession???
    res.cookie("userId", randomId)
    res.redirect("/:user");
  } else {

// redirects to top page ... for now
    res.redirect("/");
  }
});

// CREATE NEW ENTRY IN USER TABLE


// PERSONAL PAGE
  // GET USER/PAGE
app.get("/:user", (req, res) => {
  const userTasks = db.user.tasks;
  res.render("/:user", db.user.tasks);
});

app.post("/:user", (req,res) => {
  const taskName    = req.body.task;
  const categoryId  = APIFUNCTION_taskSearchStringResult;
  const url         = req.body.url;
  const priority    = req.body.priority;
  const status      = req.body.status;
  const createdAt   = Date.now();

  const taskObj = {
    task_name   : taskName,
//  do we need this?
//  user_id     : userId,
    category_id : categoryId,
    url         : url,
    priority    : priority,
    status      : status,
    created_at  : createdAt,
  }
  // very likely NOT the proper syntax
  knex.create.db[user][taskId] = taskObj; // ships taskObj to knex to create new task
});


    // POST USER/PAGE (TASK)
    // PUT USER/PAGE (UPDATE)

// USER PROFILE
    // GET USER
    // PUT USER/UPDATE

// ADMIN PAGE
    // GET ADMIN
    // GET USER TABLE
    // DELETE USER

// TASKS PAGE
    // GET TASK PAGE
    // PUT TASK TABLE
    // UPDATE TASK


// ******************************************************

app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});
