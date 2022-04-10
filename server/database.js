const properties = require('./json/properties.json');
const users = require('./json/users.json');
const dbParams = require('./lib/db.js');
const {db} = require('../server.js');



const getAllListings = function(listings) {
  return db.query(`SELECT (*)
    FROM listings
    ORDER BY listings DESC
    LIMIT 10;`)
    .then((result) => result)
    .catch((err) => console.log(err));
};
exports.getAllReservations = getAllListings;


const getMessages = function(messages) {

};


const getFavorites = function(favorites) {

};




// const createListing = function(listings) {
//   const queryParams = [
//     listings.user.id,
//     listings.price,
//     listings.year,
//     listings.make,
//     listings.model,
//     listings.transmission,
//     listings.color,
//     listings.descriptiton,
//     listings.sold,
//     listings.image,
//   ];

//   const queryString = `INSERT INTO properties (user_id, price, year, make, model, transmission, color, descritption, sold, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;

//   return pool.query(queryString, queryParams).then((res) => res.rows).catch((err) => console.log(err.message));
// };

// exports.addProperty = createListing;
