const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllListings = function (limit) {
  return db.query(`SELECT *
    FROM listings
    ORDER BY listings DESC
    LIMIT $1;`, [limit])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};


const getInboxNames = () => {
  return db.query(`SELECT 
  CASE 
  WHEN sender_id = 1 THEN $1
  WHEN sender_id = 2 THEN $2
  END  
  AS sender,
  COUNT(*) AS num_of_messages,
  CASE
  WHEN receiver_id = 1 THEN $1
  WHEN receiver_id = 2 THEN $2
  END 
  AS receiver
  FROM messagelisting
  JOIN users
  ON users.id=receiver_id
  GROUP BY users.name, receiver_id, sender_id
  ORDER BY users.name;
    `, ['Jojo Leadbeatter', 'Tom Doretto'])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getChat = () => {
  return db.query(`SELECT messagelisting.id AS message_id, 
  CASE
  WHEN users.id = 1 THEN $1
  WHEN users.id = 2 THEN $2
  END  
  AS sender, 
  CASE
  WHEN receiver_id = 1 THEN $1 
  WHEN receiver_id = 2 THEN $2
  END AS receiver, messagetext, admin, listings.user_id AS seller, messages.listing_id AS listing_id FROM messagelisting
  JOIN users ON users.id=sender_id
  JOIN listings ON users.id=listings.id JOIN messages ON messages.id=messagelisting.message_id 
  ORDER BY messagelisting.id DESC
  ;`, ['Jojo Leadbeatter', 'Tom Doretto'])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getFavorites = function (favorites) {

};

const getUsers = (userID) => {
  return db.query(`SELECT * FROM users
  WHERE id = $1;`, [userID])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};


const createListing = function (listings) {
  const queryParams = [
    listings.price,
    listings.year,
    listings.make,
    listings.model,
    listings.transmission,
    listings.color,
    listings.descriptions,
    listings.imageURL,
  ];

  const queryString = `INSERT INTO listings (
    price,
    year,
    make,
    model,
    transmission,
    color,
    descriptions,
    imageURL
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;

  return db.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const getAllMakes = function () {
  return db.query(`SELECT DISTINCT make FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const getAllModels = function () {
  return db.query(`SELECT DISTINCT model, make FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const sendMessage = (message) => {
  console.log('MESSAGEQUERY:', message);
  switch (message.sender) {
  case 'Jojo Leadbeatter': message.sender = 1;
    break;
  case 'Tom Doretto': message.sender = 2;
    break;
  }

  return db.query(`
  INSERT INTO messagelisting (sender_id, 
    receiver_id, 
    message_id, 
    messageText) VALUES
($1, $2, 1, $3)
  `, [message.sender, message.receiver, message.text])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

module.exports = {
  getAllListings,
  createListing,
  getAllMakes,
  getAllModels,
  getInboxNames,
  getChat,
  getUsers,
  sendMessage
};
