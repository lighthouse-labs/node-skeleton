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


// const getMessages = function(messages) {

// };


// const getFavorites = function(favorites) {

// };




const createListing = function(listings) {
  const queryParams = [
    listings.user.id,
    listings.price,
    listings.year,
    listings.make,
    listings.model,
    listings.transmission,
    listings.color,
    listings.descriptiton,
    listings.sold,
    listings.image,
  ];

  const queryString = `INSERT INTO properties (
    user_id,
    price,
    year,
    make,
    model,
    transmission,
    color,
    descritption,
    sold,
    image
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;

  return db.query(queryString, queryParams)
  .then((res) => res.rows)
  .catch((err) => console.log(err.message));
};

module.exports = {
  getAllListings,
  createListing
}
