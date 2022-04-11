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
  const form = req.body;
  if (!form.model || !form.make || !form.year || !form.price || !form.color)  {
    res.status(403).send('Missing Required Information!');
    return;
  }

  database.createListing(req.body)
    .then(listing => {
      console.log(req.body, "\nListing Added to Databse");
      res.status(201).send('New Listing Created!');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/make', (req, res) => {
  database.getAllMakes()
  .then(makes => res.send(makes))
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});

router.get('/model', (req, res) => {
  database.getAllModels()
  .then(models => res.json(models))
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});


module.exports = router;
