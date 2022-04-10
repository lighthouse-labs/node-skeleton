const express = require('express');
const router = express.Router();
const database = require('./database');




  router.get('', (req, res) => {
    database.getAllListings(10)
      .then(listings => res.json(listings))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });


  router.post('', (req, res) => {
    createListing({...req.body})
      .then(listing => {
        res.send(listing);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });


  module.exports = router;
