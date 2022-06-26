const express = require('express');
const router  = express.Router();

const { getAllWines } = require('../../db/database');
const { getAllRedWines } = require('../../db/database');
const { getAllWhiteWines } = require('../../db/database');

module.exports = (db) => {
  router.get("/wines", async(req, res) => {
    const result = await getAllWines();
    const templateVars = {
      allWines: result
    };
    res.render('all-wines', templateVars);
  });
  router.get("/wines/red", async(req, res) => {
    const result = await getAllRedWines();
    const templateVars = {
      allRedWines: result
    };
    res.render('red-wines', templateVars);
  });
  router.get("/wines/white", async(req, res) => {
    const result = await getAllWhiteWines();
    const templateVars = {
      allWhiteWines: result
    };
    res.render('white-wines', templateVars);
  });
  //Test db connection
  // router.get("/test", async (req, res) => {
  //   const result = await getAllWines();
  //   res.send(result);
  // });
  return router;
};
