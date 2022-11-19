import db from '../connection.js';

export const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then((data) => {
      return data.rows;
  });
};
