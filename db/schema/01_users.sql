-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS messagelisting CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADES,
  price INTEGER NOT NULL DEFAULT 0,
  year INTEGER NOT NULL DEFAULT 0,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  transmission BOOLEAN NOT NULL DEFAULT FALSE,
  color VARCHAR(255) NOT NULL,
  descriptions TEXT,
  sold BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADES,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADES,
  favorited BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INTEGER REFERENCES users(id) ON DELETE CASCADES,
  dateTime DATE NOT NULL,
  hasMessage BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE messagelisting (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADES,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADES,
  message_id INTEGER REFERENCES messages(id) ON DELETE CASCADES
  messageText TEXT
);
