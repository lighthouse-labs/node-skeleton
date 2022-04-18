const e = require('express');
const express = require('express');
const router = express.Router();
const database = require('./helper/database');


router.get('', (req, res) => {
  let id = 1;
  if (req.cookies.user_id) {
    id = req.cookies.user_id;
  }

  database.getAllListings(id, 50)
    .then(listings => {
      res.send(listings);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/browse', (req, res) => {
  let id = 1;
  if (req.cookies.user_id) {
    id = req.cookies.user_id;
  }
  const data = req.query;

  let filter = {
    search: data.search ? data.search.toLowerCase() : '',
    carMake: data ? data.carMake : '',
    transmission: data ? data.transmission : '',
    minPrice: data.minPrice ? data.minPrice.slice(1) : '',
    maxPrice: data.maxPrice ? data.maxPrice.slice(1) : '',
    minYear: data ? data.minYear : '',
    maxYear: data ? data.maxYear : ''
  };

  database.browseListings(filter, 50, id)
    .then((listings) => {
      res.send(listings);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/mylisting', (req, res) => {
  let id = req.cookies.user_id;

  database.getMyListings(id)
    .then((listings) => res.send(listings))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/soldlisting', (req, res) => {
  let id = req.cookies.user_id;

  database.getSoldListings(id)
    .then((listings) => res.send(listings))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.get('/favorited', (req, res) => {
  let id = req.cookies.user_id;

  database.getFavorites(id)
    .then((favorites) => {
      res.send(favorites);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.post('/favoritesTrue/:listID', (req, res) => {
  let id = req.cookies.user_id;

  if (!id) {
    res.sendStatus(403);
    return;
  }

  const listID = req.params.listID;

  database.postFavoritesTrue(id, listID)
    .then(() => res.redirect('/listing/browse'))
    .catch(e => console.error(e));
});


router.post('/favoritesFalse/:listID', (req, res) => {
  let id = req.cookies.user_id;

  const listID = req.params.listID;

  database.postFavoritesFalse(id, listID)
    .then(() => res.redirect('/listing/favorited'))
    .catch(e => console.error(e));
});


router.post('/delete/:listID', (req, res) => {
  const listID = req.params.listID;

  database.deleteFromList(listID)
    .then(() => {
      res.redirect('/listing/soldlisting');

    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/sold/:listID', (req, res) => {
  const listID = req.params.listID;

  database.changeToSold(listID)
    .then(() => res.redirect('/listing/mylisting'))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


router.post('', (req, res) => {
  const form = req.body;

  if (!form.imageURL ||
    !form.model ||
    !form.make ||
    !form.year ||
    !form.price ||
    !form.color) {
    return;
  }

  let id = req.cookies.user_id;

  database.createListing(id, req.body)
    .then(() => {
      console.log(req.body, "\nListing Added to Database");
      console.log('New Listing Created!');
      res.redirect('listing/mylisting');
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});


module.exports = router;
