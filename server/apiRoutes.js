const express = require('express');
const router = express.Router();
const database = require('./database');
const messages = 'http://localhost:8080/api/messages';


router.get('/messages', (req, res) => {
  database.getInboxNames(messages)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

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
  if (!form.imageURL || !form.model || !form.make || !form.year || !form.price || !form.color) {
    return;
  }
  database.createListing(req.body)
    .then(listing => {
      console.log(req.body, "\nListing Added to Databse");
      res.status(201)
      console.log('New Listing Created!');
      res.redirect('/');
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
  .then(models => res.send(models))
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});


module.exports = router;
