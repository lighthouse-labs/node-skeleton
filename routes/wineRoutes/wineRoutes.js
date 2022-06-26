const express = require('express');
const router  = express.Router();

const { getAllWines } = require('../../db/database');


module.exports = (db) => {
  router.get("/wines", async(req, res) => {
    const result = await getAllWines();
    const templateVars = {
      allWines: result
    };
    res.render('all-wines', templateVars);
  });
  router.get("/wines/red", function(req, res) {
    res.render('red-wines');
  });
  router.get("/wines/white", function(req, res) {
    res.render('white-wines');
  });
  //Test db connection
  // router.get("/test", async (req, res) => {
  //   const result = await getAllWines();
  //   res.send(result);
  // });
  return router;
};
