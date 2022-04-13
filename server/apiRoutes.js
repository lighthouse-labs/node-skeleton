const express = require('express');
const router = express.Router();
const database = require('./database');
const messages = 'http://localhost:8080/api/messages';
const users = 'http://localhost:8080/api/users';

router.get('/browse', (req, res) => {
  const data = req.query;
  const filter = {
    search: data.search.toLowerCase(),
    carMake: data.carMake,
    transmission: data.transmission,
    minPrice:  data.minPrice.slice(1),
    maxPrice: data.maxPrice.slice(1),
    minYear: data.minYear,
    maxYear: data.maxYear
  }

  database.browseListings(filter , 20)
  .then((listings) => res.send(listings))
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

router.get('/inbox', (req, res) => {
  database.getInboxNames(messages)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/messages', (req, res) => {
  database.getChat(messages)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/messages/:id', (req, res) => {
  res.cookie('user_id', req.params.id);
  const params = {
    text: req.body.text,
    receiver: req.body.receiver,
    sender: req.params.id
  };
  database.sendMessage(params)
    .then(messages => res.json(messages))
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

router.get('/:id', (req, res) => {
  res.cookie('user_id', req.params.id);
  database.getUsers(req.params.id)
    .then(user => {
      const params = {
        name: user[0].name
      };
      console.log('USER LOGGED:', user[0]);
      res.render("index", params);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('', (req, res) => {
  database.getAllListings(10)
  .then(listings => res.send(listings))
  .catch(e => {
    console.error(e);
    res.send(e);
  });
});

router.post('', (req, res) => {
  res.cookie('user_id', req.params.id);
  const form = req.body;
  if (!form.imageURL || !form.model || !form.make || !form.year || !form.price || !form.color) {
    return;
  }
  database.createListing(req.body)
  .then(listing => {
    console.log(req.body, "\nListing Added to Databse");
    res.status(201);
    console.log('New Listing Created!');
    res.redirect('/');
  })
  .catch(e => {
    console.error(e);
    res.send(e);
  });

  router.get('/:id', (req, res) => {
    res.cookie('user_id', req.params.id);
    database.getUsers(req.params.id)
      .then(user => {
        console.log(user[0]);
        res.redirect("/");
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
});

module.exports = router;
