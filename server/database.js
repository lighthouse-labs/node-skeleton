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

const browseListings = function(filter, limit) {
  const queryParams = [];
  let queryString = `SELECT *
  FROM listings
  WHERE TRUE
  `;

  if (filter.search) {
    queryParams.push(`%${filter.search}%`);
    queryString += `AND LOWER(make) LIKE $${queryParams.length} OR LOWER(model) LIKE $${queryParams.length}`;
  }

  if (filter.carMake) {
    if (Array.isArray(filter.carMake)) {
      console.log(filter.carMake);
      for (const make of filter.carMake) {
        queryParams.push(make);
        queryString += `AND make = $${queryParams.length}`;
      }
    } else {
      queryParams.push(filter.carMake);
      queryString += `AND make = $${queryParams.length}`;
    }
  }

  if (filter.transmission) {
    queryParams.push(filter.transmission);
    queryString += `AND transmission = $${queryParams.length}`;
  }

  if (filter.minPrice) {
    queryParams.push(filter.minPrice);
    queryString += `AND price >= $${queryParams.length}`;
  }

  if (filter.maxPrice) {
    queryParams.push(filter.maxPrice);
    queryString += `AND price <= $${queryParams.length}`;
  }

  if (filter.minYear) {
    queryParams.push(filter.minYear);
    queryString += `AND year >= $${queryParams.length}`;
  }

  if (filter.maxYear) {
    queryParams.push(filter.maxYear);
    queryString += `AND year <= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY listings DESC
  LIMIT $${queryParams.length};
  `;
  return db.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getInboxNames = () => {
  return db.query(`SELECT
  CASE
  WHEN sender_id = 1 THEN $1
  WHEN sender_id = 2 THEN $2
  WHEN sender_id = 3 THEN $3
  END
  AS sender,
  COUNT(*) AS num_of_messages,
  CASE
  WHEN receiver_id = 1 THEN $1
  WHEN receiver_id = 2 THEN $2
  WHEN receiver_id = 3 THEN $3
  END
  AS receiver
  FROM messagelisting
  JOIN users
  ON users.id=receiver_id
  GROUP BY users.name, receiver_id, sender_id
  ORDER BY users.name;
    `, ['Jojo Leadbeatter', 'De Roo', 'Tom Doretto'])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const getChat = () => {
  return db.query(`SELECT messagelisting.id AS message_id,
  CASE
  WHEN users.id = 1 THEN $1
  WHEN users.id = 2 THEN $2
  WHEN users.id = 3 THEN $3
  END
  AS sender,
  CASE
  WHEN receiver_id = 1 THEN $1
  WHEN receiver_id = 2 THEN $2
  WHEN receiver_id = 3 THEN $3
  END AS reciever, messagetext, admin FROM messagelisting
  JOIN users ON users.id=sender_id
  ORDER BY messagelisting.id DESC
  LIMIT 4
  ;`, ['Jojo Leadbeatter', 'De Roo', 'Tom Doretto'])
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
  case 'De Roo': message.sender = 2;
    break;
  case 'Tom Doretto': message.sender = 3;
    break;
  }

  return db.query(`
  INSERT INTO messagelisting (sender_id,receiver_id, message_id, messageText) VALUES
($1, 2, 1, $2)
  `, [message.sender, message.text])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

module.exports = {
  browseListings,
  getAllListings,
  createListing,
  getAllMakes,
  getAllModels,
  getInboxNames,
  getChat,
  getUsers,
  sendMessage
};
