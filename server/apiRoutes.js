const express = require('express');
const router = express.Router();
const database = require('./database');
const messages = 'http://localhost:8080/api/messages';
const users = 'http://localhost:8080/api/users';

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

module.exports = router;
