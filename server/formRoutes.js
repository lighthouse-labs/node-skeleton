const express = require('express');
const router = express.Router();
const database = require('./helper/database');

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
    .then(models => res.send(models))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/price', (req, res) => {
  database.getMinMaxPrice()
  .then((priceRange) => res.send(priceRange))
  .catch((e) => console.error(e));
});

router.get('/year', (req, res) => {
  database.getMinMaxYear()
  .then((yearRange) => res.send(yearRange))
  .catch((e) => console.error(e));
});


module.exports = router;
