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
  return db.query(`SELECT users.name AS name, sender_id, COUNT(*) AS num_of_messages
  FROM messagelisting 
  JOIN users 
  ON users.id=sender_id
  GROUP BY users.name, sender_id
  ORDER BY users.name;
    `)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getChat = () => {
  return db.query(`SELECT messagelisting.id AS message_id, users.name AS sender, users.name AS reciever, messagetext FROM messagelisting
  JOIN users ON users.id=sender_id 
  ORDER BY messagelisting.id
  ;`)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
}

const getFavorites = function (favorites) {

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
  getInboxNames
};
