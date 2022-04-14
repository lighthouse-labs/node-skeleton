const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllListings = function(limit) {
  return db.query(`
  SELECT listings.id AS listing_id,
  listings.user_id AS seller,
  price, year, make, model,
  transmission, color, descriptions,
  sold, imageURL, favorited
  FROM users
  JOIN favorites ON user_id=users.id
  RIGHT JOIN listings ON listing_id=listings.id
  WHERE sold IS false
  GROUP BY listings.id, favorites.favorited, favorites.user_id
  ORDER BY listing_id
  LIMIT $1;`, [limit])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const browseListings = function(filter, limit) {
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
    queryString += `)`;
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


const getFavorites = (userID) => {
  return db.query(`
  SELECT name AS user_name,
  favorites.user_id AS user_id,
  listings.id AS listing_id,
  listings.user_id AS seller,
  price, year, make, model,
  transmission, color, descriptions,
  sold, imageURL, favorited
  FROM users
  JOIN favorites ON user_id=users.id
  JOIN listings ON listing_id=listings.id
  WHERE favorites.user_id = $1
  GROUP BY name, listings.id, favorites.favorited, favorites.user_id
  ORDER BY listing_id;`, [userID])
    .then((result) => result.rows)
    .catch((err) => console.error(err));
};

const postFavorites = (user_id, listing_id) => {
  const isFavorite = true;
  return db.query(`INSERT INTO favorites (user_id, listing_id, favorited) VALUES (${user_id}, ${listing_id}, ${isFavorite})`)
    .then((result) => (result.rows))
    .catch((err) => console.error(err));
};

const deleteFromList = (listing) => {
  return db.query(`
  DELETE FROM listings WHERE id = $1
  ;`, [listing])
    .then((result) => {
      console.log(`deleted list item ${listing} from table`);
    })
    .catch((err) => console.error(err));
};

const changeToSold = (listingID) => {
  return db.query(`
  UPDATE listings
  SET sold = TRUE
  WHERE id = $1
  ;`, [listingID])
    .then((result) => {
      console.log(`Listing #${listingID} is now sold`);
    })
    .catch((err) => console.error(err));
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
  sendMessage,
  getMinMaxPrice,
  getMinMaxYear,
  getMyListings,
  getSoldListings,
  getUserByEmail,
  deleteFromList,
  changeToSold,
  getFavorites,
  postFavorites
};
