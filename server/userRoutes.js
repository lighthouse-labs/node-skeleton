const express = require('express');
const router = express.Router();
const database = require('./database');
const cookieParser = require('../server');


router.get('/login/:id', (req, res) => {
  res.clearCookie('username');
  res.cookie('username', req.params.id);
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});

router.post('/login', (req, res) => {
  const form = req.body;
  database.getUserByEmail(form.email.toLowerCase())
    .then((user) => {
      console.log(user);
      if (!user[0]) {
        res.redirect('/');
      } else {
        if (user[0].password === form.password) {
          res.clearCookie('username');
          res.cookie('username', user[0].id);
          res.redirect('/');
        } else {
          res.redirect('/');
        }
      }
    });
});



module.exports = router;
