const { Pool } = require("pg");
const dbParams = require("../../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllListings = function (id, limit) {
  return db.query(`
  SELECT listings.*,
  users.name, users.country, users.city, users.province, favorites.favorite
  FROM users
  RIGHT JOIN listings on listings.user_id = users.id
  LEFT JOIN (SELECT * FROM favorites
  WHERE favorites.user_id = $1) as favorites
  ON favorites.listing_id = listings.id;
  WHERE sold IS FALSE
  AND (favorites.favorite IS NULL OR favorites.favorite IS FALSE)
  AND listings.user_id != $1
  GROUP BY listings.id, favorites.user_id, favorites.favorite,
  users.name, users.*, users.country,
  users.city, users.province
  ORDER BY id
  LIMIT $2;`, [id, limit])
    .then((result) => result.rows)
    .catch((err) => console.log(err.message));
};

const browseListings = function (filter, limit, id) {
  const queryParams = [];
  queryParams.push(id);
  let queryString = `
  SELECT listings.*,
  users.name, users.country, users.city, users.province, favorites.favorite
  FROM users
  RIGHT JOIN listings on listings.user_id = users.id
  LEFT JOIN (SELECT * FROM favorites
  WHERE favorites.user_id = $${queryParams.length}) as favorites
  ON favorites.listing_id = listings.id
  WHERE sold IS FALSE
  AND listings.user_id != $${queryParams.length}
  AND (favorites.favorite IS FALSE OR favorites.favorite IS NULL)
  `;

  if (filter.search) {
    queryParams.push(`%${filter.search}%`);
    queryString += `AND (LOWER(make) LIKE $${queryParams.length} `;
    queryString += `OR LOWER(model) LIKE $${queryParams.length} `;
    queryString += `OR LOWER(listings.color) LIKE $${queryParams.length} `;
    queryString += `OR listings.year::text LIKE $${queryParams.length} `;
    queryString += `OR listings.id::text LIKE $${queryParams.length}) `;
  }

  if (filter.carMake) {
    queryParams.push(filter.carMake[0]);
    queryString += `AND (make = $${queryParams.length} `;

    if (filter.carMake.length > 1) {
      for (const make of filter.carMake.slice(1)) {
        queryParams.push(make);
        queryString += `OR make = $${queryParams.length}`;
      }
    }
    queryString += `) `;
  }

  if (filter.transmission) {
    queryParams.push(filter.transmission);
    queryString += `AND transmission = $${queryParams.length} `;
  }

  if (filter.minPrice) {
    queryParams.push(filter.minPrice);
    queryString += `AND price >= $${queryParams.length} `;
  }

  if (filter.maxPrice) {
    queryParams.push(filter.maxPrice);
    queryString += `AND price <= $${queryParams.length} `;
  }

  if (filter.minYear) {
    queryParams.push(filter.minYear);
    queryString += `AND year >= $${queryParams.length} `;
  }

  if (filter.maxYear) {
    queryParams.push(filter.maxYear);
    queryString += `AND year <= $${queryParams.length} `;
  }


  queryParams.push(limit);
  queryString += `
  GROUP BY listings.id, users.id, favorites.user_id, favorites.favorite
  ORDER BY listings.id
  LIMIT $${queryParams.length};`;



  return db.query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    }).catch((err) => console.log(err.message));
};
const getInboxBuyer = (id) => {
  return db.query(`
  SELECT messages.id, listing_id, users.name, created_at
  FROM messages
  JOIN listings ON listings.id = listing_id
  JOIN users ON users.id = listings.user_id
  WHERE messages.user_id = $1 OR listings.user_id = $1
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
  JOIN users ON users.id = messages.user_id
  WHERE messages.user_id = $1 OR listings.user_id = $1
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


const createListing = (id, listings) => {
  const queryParams = [
    id,
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
    user_id,
    price,
    year,
    make,
    model,
    transmission,
    color,
    descriptions,
    imageURL
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;

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

const createMessage = (request) => {
  const queryParams = [
    request.listing_id,
    request.id,
    request.created_at
  ];
  const queryString = `
  INSERT INTO messages (
    listing_id,
    user_id,
    created_at
  ) VALUES ($1, $2, $3) RETURNING *;`;

  return db.query(queryString, queryParams)
    .then((result) => {
      result.rows;
    })
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
  SELECT listings.*,
  users.city,
  users.country,
  users.province,
  users.name
  FROM listings
  JOIN users ON listings.user_id=users.id
  WHERE user_id = $1
  AND sold IS FALSE
  GROUP BY listings.id, users.city, users.country, users.province, users.name
  ORDER BY listings.id;`, [id])
    .then((result) => (result.rows))
    .catch((err) => console.error(err));
};

const getSoldListings = (id) => {
  return db.query(`
  SELECT listings.*, users.city,
  users.country,
  users.province,
  users.name
  FROM listings
  JOIN users ON users.id=listings.user_id
  WHERE user_id = $1
  AND sold IS TRUE
  GROUP BY users.id, listings.id
  ORDER BY listings;`, [id])
    .then((result) => (result.rows))
    .catch((err) => console.error(err));
};

const getFavorites = (userID) => {
  return db.query(`
  SELECT listings.*,
  favorites.favorite,
  users.name,
  users.city,
  users.country,
  users.province
  FROM users
  RIGHT JOIN listings ON listings.user_id = users.id
  LEFT JOIN (SELECT * FROM favorites
  WHERE favorites.user_id = $1) AS favorites
  ON favorites.listing_id = listings.id
  WHERE favorites.user_id = $1
  AND favorites.favorite IS TRUE
  GROUP BY name, listings.id, favorites.user_id, favorites.favorite,
  users.city, users.country, users.province
  ORDER BY id;`, [userID])
    .then((result) => result.rows)
    .catch((err) => console.error(err));
};




// FAVORITES FIXES  V 1.01

const checkFavoriteState = (id, listID) => {
  return db.query(`
  SELECT * FROM favorites
  WHERE favorites.user_id = $1
  AND favorites.user_id = $2
  `, [id, listID])
    .then((result) => result.rows)
    .catch((err) => console.error(err));
};

const deleteFromTable = (id, listID) => {
  return db.query(`
  DELETE from favorites
  WHERE user_id = $1 AND listing_id = $2
  `, [id, listID])
    .then((result) => result.rows)
    .catch((err) => console.error(err));
};

const postFavoritesTrue = (id, listID) => {

  return db.query(`
  INSERT INTO favorites (user_id, listing_id)
  VALUES ($1, $2)`, [id, listID])
    .then((result) => (result.rows))
    .catch((err) => console.error(err));
};

const postFavoritesFalse = (id, listID) => {

  return db.query(`
  UPDATE favorites
  SET favorite = FALSE
  WHERE user_id = $1
  AND listing_id = $2
  ;`, [id, listID])
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
  console.log(listingID);
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
  getUsers,
  sendMessage,
  getMinMaxPrice,
  getMinMaxYear,
  getMyListings,
  getSoldListings,
  getUserByEmail,
  getInboxBuyer,
  getInboxSeller,
  getMessages,
  deleteFromList,
  changeToSold,
  getFavorites,
  createMessage,
  postFavoritesTrue,
  postFavoritesFalse,
  deleteFromTable,
  checkFavoriteState
};
