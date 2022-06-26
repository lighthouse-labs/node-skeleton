const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllWines = async () => {
  const result = await db.query(`SELECT * FROM wine_listings`);
  console.log("result", result);
  return result.rows;
};
const getAllRedWines = async () => {
  const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='Red'`);
  return result.rows;
};
const getAllWhiteWines = async () => {
  const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='White'`);
  return result.rows;
};

module.exports = {
  getAllWines,
  getAllRedWines,
  getAllWhiteWines
};
