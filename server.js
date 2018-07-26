"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const bcrypt        = require("bcryptjs");
const cookieSession = require("cookie-session");
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
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// ******************************************************
// FUNCTIONS




// ******************************************************

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/session", (req,res) => {
  res.redirect("/");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post("/registration", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  res.redirect("/");
});

app.get("/tasks", (req, res) => {
  res.render("tasks");
});

app.get("/tasks/new", (req, res) => {
  res.render("newTask");
});

app.post("/tasks", (req, res) => {
  res.redirect("/tasks"); // redirect to tasks/:id eventually
});

app.get("/tasks/:id", (req, res) => {
  res.render("specifcTask");
});

app.get("/tasks/:id/edit", (req, res) => {
  res.render("editTask");
});

app.put("/tasks/:id", (req, res) => {
  res.redirect("/tasks/:id");
});

app.delete("/tasks/:id", (req, res) => {
  res.redirect("/tasks");
});

app.get("/profile/edit", (req, res) => {
  res.render("profileEdit");
});

app.put("/profile", (req, res) => {
  res.redirect("/tasks"); // TBD
});

app.get("/admin/users", (req, res) => {
  res.render("adminUsers");
});

app.delete("/admin/users/:id", (req, res) => {
  res.redirect("/admin/users");
});


// ******************************************************

app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});
