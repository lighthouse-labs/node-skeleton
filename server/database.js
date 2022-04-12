const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllListings = function(limit) {
  return db.query(`SELECT *
    FROM listings
    ORDER BY listings DESC
    LIMIT $1;`, [limit])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};


const getInboxNames = () => {
  return db.query(`SELECT CASE
  WHEN sender_id = 1 THEN 'Jojo Leadbeatter'
  WHEN sender_id = 2 THEN 'De Roo'
  WHEN sender_id = 3 THEN 'John Doe'
  END  
  AS sender,
  COUNT(*) AS num_of_messages,
  CASE
  WHEN receiver_id = 1 THEN 'Jojo Leadbeatter'
  WHEN receiver_id = 2 THEN 'De Roo'
  WHEN receiver_id = 3 THEN 'John Doe'
  END 
  AS receiver
  FROM messagelisting
  JOIN users
  ON users.id=receiver_id
  GROUP BY users.name, receiver_id, sender_id
  ORDER BY users.name;
    `)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getChat = () => {
  return db.query(`SELECT messagelisting.id AS message_id, 
  CASE
  WHEN users.id = 1 THEN 'Jojo Leadbeatter'
  WHEN users.id = 2 THEN 'De Roo'
  WHEN users.id = 3 THEN 'John Doe'
  END  
  AS sender, 
  CASE
  WHEN messagelisting.receiver_id = 1 THEN 'Jojo Leadbeatter'
  WHEN messagelisting.receiver_id = 2 THEN 'De Roo'
  WHEN messagelisting.receiver_id = 3 THEN 'John Doe'
  END AS reciever, messagetext, admin FROM messagelisting
  JOIN users ON users.id=sender_id 
  ORDER BY messagelisting.id
  ;`)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getFavorites = function(favorites) {

};

const getUsers = (userID) => {
  return db.query(`SELECT * FROM users
  WHERE id = $1;`, [userID])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};


const createListing = function(listings) {
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

const getAllMakes = function() {
  return db.query(`SELECT DISTINCT make FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const getAllModels = function() {
  return db.query(`SELECT DISTINCT model, make FROM listings;`)
    .then((res) => res.rows)
    .catch((err) =>  console.log(err.message));
};

module.exports = {
  getAllListings,
  createListing,
  getAllMakes,
  getAllModels,
  getInboxNames,
  getChat,
  getUsers
};
