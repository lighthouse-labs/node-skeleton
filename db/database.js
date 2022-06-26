const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

const getAllWines = async () => {
  const result = await db.query(`SELECT * FROM wine_listings`);
  console.log("result", result);
  return result;
};

module.exports = {
  getAllWines,
};
