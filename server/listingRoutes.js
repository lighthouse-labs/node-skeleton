const express = require('express');
const router = express.Router();
const database = require('./database');
const cookieParser = require('../server');

const id = 

router.get('/browse', (req, res) => {
  const data = req.query;
  const filter = {
    search: data.search.toLowerCase(),
    carMake: data.carMake,
    transmission: data.transmission,
    minPrice: data.minPrice.slice(1),
    maxPrice: data.maxPrice.slice(1),
    minYear: data.minYear,
    maxYear: data.maxYear
  };

  database.browseListings(filter, 20)
    .then((listings) => res.send(listings))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/mylisting', (req, res) => {
  const id = req.cookies.username || req.cookies.user_id;
  database.getMyListings(id)
    .then((listings) => res.send(listings))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/soldlisting', (req, res) => {
  const id = req.cookies.username || req.cookies.user_id;
  database.getSoldListings(id)
    .then((listings) => res.send(listings))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/favorites', (req, res) => {
  const id = req.cookies.user_id;
  database.getFavorites(id)
    .then((favorites) => res.send(favorites))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/users/:idUser/listings/:idListing/favorite', (req, res) => {
  const idUser = req.params.idUser;
  const idListing = req.params.idListing;
  const params = {
    listing_id: req.body.idListing,
    user_id: req.params.idUser
  };
  console.log(params);
  database.postFavorites(idUser, idListing)
    .then((favorites) => res.send(favorites))

router.post('/delete/:listID', (req, res) => {
  const listID = req.params.listID;
  const id = req.cookies.user_id;
  console.log('/delete/:listID test');
  database.deleteFromList(listID, id)
    .then(() => {
      console.log('test after THEN')
      res.redirect('/listing/soldlisting');
      console.log('TEST AFTER REDIRECT')
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
});

module.exports = router;
