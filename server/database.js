const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllListings = function (limit) {
  return db.query(`SELECT *
    FROM listings
    WHERE sold IS FALSE
    ORDER BY listings DESC
    LIMIT $1;`, [limit])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const browseListings = function (filter, limit) {
  const queryParams = [];
  let queryString = `SELECT *
  FROM listings
  WHERE sold IS FALSE
  `;

  if (filter.search) {
    queryParams.push(`%${filter.search}%`);
    queryString += `AND (LOWER(make) LIKE $${queryParams.length}`;
    queryString += `OR LOWER(model) LIKE $${queryParams.length})`;
  }

  if (filter.carMake) {
    queryParams.push(filter.carMake[0]);
    queryString += `AND (make = $${queryParams.length}`;

    if (filter.carMake.length > 1) {
      for (const make of filter.carMake.slice(1)) {
        queryParams.push(make);
        queryString += `OR make = $${queryParams.length}`;
      }
    }
    queryString += `)`
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

const getInboxBuyer = (id) => {
  return db.query(`
  SELECT messages.id, listing_id, users.name, created_at
  FROM messages
  JOIN listings ON listings.id = listing_id
  JOIN users ON users.id = listings.user_id
  WHERE messages.buyer_id = $1 OR listings.user_id = $1
  ORDER BY created_at;
  `, [id])
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));
};

const getInboxSeller = (id) => {
  return db.query(`
  SELECT messages.id, listing_id, users.name, created_at
  FROM messages
  JOIN listings ON listings.id = listing_id
  JOIN users ON users.id = messages.buyer_id
  WHERE messages.buyer_id = $1 OR listings.user_id = $1
  ORDER BY created_at;
  `, [id])
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));
};

const getMessages = (inbox) => {
  return db.query(`
  SELECT users.name, messagetext, messages.id
  FROM messageListing
  JOIN messages ON messages.id = message_id
  JOIN listings ON listings.id = messages.listing_id
  JOIN users ON users.id = messageListing.sender_id
  WHERE messages.id = $1
  ORDER BY timesent;
  `, [inbox])
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));
};


const getChat = (inbox, id) => {
  return db.query(`SELECT * WHEN ,
  CASE
  WHEN users.id = 1
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

const getUserByEmail = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE LOWER(email) = $1`, [email])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};


const createListing = (listings) => {
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

const getAllMakes = () => {
  return db.query(`SELECT DISTINCT make FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const getAllModels = () => {
  return db.query(`SELECT DISTINCT model, make FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};


const getMinMaxPrice = () => {
  return db.query(`SELECT MIN(price) as minPrice, MAX(price) as maxPrice FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};

const getMinMaxYear = () => {
  return db.query(`SELECT MIN(year) as minYear, MAX(year) as maxYear FROM listings;`)
    .then((res) => res.rows)
    .catch((err) => console.log(err.message));
};



const sendMessage = (message) => {
  const queryParams = [
    message.inbox,
    message.sender,
    message.text,
    message.time
  ];

  const queryString = `INSERT INTO messageListing (
    message_id,
    sender_id,
    messageText,
    timesent
  ) VALUES ($1, $2, $3, $4) RETURNING *;`;

  return db.query(queryString, queryParams)
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));
};

const getMyListings = (id) => {
  return db.query(`
  SELECT * FROM listings
  WHERE user_id = $1
  AND sold IS FALSE
  ORDER BY listings DESC;`, [id])
    .then((result) => (result.rows))
    .catch((err) => console.error(err));
};

const getSoldListings = (id) => {
  return db.query(`
  SELECT * FROM listings
  WHERE user_id = $1
  AND sold IS TRUE
  ORDER BY listings;`, [id])
    .then((result) => (result.rows))
    .catch((err) => console.error(err));
};



module.exports = {
  browseListings,
  getAllListings,
  createListing,
  getAllMakes,
  getAllModels,
  getChat,
  getUsers,
  sendMessage,
  getMinMaxPrice,
  getMinMaxYear,
  getMyListings,
  getSoldListings,
  getUserByEmail,
  getInboxBuyer,
  getInboxSeller,
  getMessages
};
