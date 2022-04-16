const express = require('express');
const router = express.Router();
const database = require('./helper/database');

router.post('/logout', (req, res) => {
  res.clearCookie('user_id');
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
          res.clearCookie('user_id');
          res.cookie('user_id', user[0].id);
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
      }
    });
});

module.exports = router;
