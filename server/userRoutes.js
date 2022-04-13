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



module.exports = router;
