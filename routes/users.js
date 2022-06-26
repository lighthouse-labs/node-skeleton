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
  router.get("/all-wines", async(req, res) => {
    const result = await getAllWines();
    const templateVars = {
      allWines: result
    };
    res.render('all-wines', templateVars);
  });
  router.get("/red-wines", function(req, res) {
    res.render('red-wines');
  });
  router.get("/white-wines", function(req, res) {
    res.render('white-wines');
  });
  router.get("/login", function(req, res) {
    res.render('login');
  });
  router.get("/contact-page", function(req, res) {
    res.render('contact');
  });
  router.get("/favourites", function(req, res) {
    res.render('favorites');
  });
  //Test db connection
  // router.get("/test", async (req, res) => {
  //   const result = await getAllWines();
  //   res.send(result);
  // });

  // favorites page favorite button:
  router.get("/favorites_status", function(req, res) {
    res.render('/favorites_status/userid/listing');
  });
  return router;
};
