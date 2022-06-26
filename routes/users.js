/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const { getAllWines } = require('../db/database');


module.exports = (db) => {
  router.get("/login", function(req, res) {
    res.render('login');
  });
  router.get("/contact-page", function(req, res) {
    res.render('contact');
  });
  router.get("/favourites", function(req, res) {
    res.render('favorites');
  });
  // favorites page favorite button:
  router.get("/favorites_status", function(req, res) {
    res.render('/favorites_status/userid/listing');
  });
  return router;
};
