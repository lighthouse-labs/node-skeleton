// PG database client/connection setup
import * as pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg.default;

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

console.log(dbParams);

const db = new Pool(dbParams);

db.connect();

export default db;
