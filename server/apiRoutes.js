const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const database = require('./database');



router.get('/inbox', (req, res) => {
  const id = req.cookies.user_id;
  database.getInbox(id)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/messages', (req, res) => {
  const id = req.cookies.user_id;
  database.getUsers(id)
    .then((user) => {
      if (user[0].admin) {
        database.getInboxSeller(id)
          .then((result) => res.json(result))
          .catch((e) => console.error(e));
      } else {
        database.getInboxBuyer(id)
          .then((result) => res.json(result))
          .catch((e) => console.error(e));
      }
    });
});



router.post('/messages/:id', (req, res) => {
  const params = {
    sender: req.cookies.user_id,
    text: req.body.text,
    inbox: req.params.id,
    time: Math.floor(Date.now() / 10000)
  };

  database.sendMessage(params)
    .then(messages => res.json(messages))
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.get('/messages/:id', (req, res) => {
  const inbox = req.params.id;
  database.getMessages(inbox)
    .then((messages) => res.send(messages))
    .catch((e) => console.error(e));
});

router.get('/:id', (req, res) => {
  res.clearCookie('user_id');
  res.cookie('user_id', req.params.id);
  database.getUsers(req.params.id)
    .then(user => {
      const params = {
        name: user[0].name
      };
      res.render("index", params);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
});

router.post('/messages/new/:id', (req, res) => {
  let userID = 0;
  const id = req.params.id;

  if (req.cookies.user_id) {
    userID = req.cookies.user_id;
  }
  const params = {
    listing_id: id,
    id: userID,
    created_at: Math.floor(Date.now() / 10000)
  }
  console.log('APIROUTE:', 'CHECK');
  database.createMessage(params)
    .then((newMessage) => res.send(newMessage))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});


module.exports = router;
