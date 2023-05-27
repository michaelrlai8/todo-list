const { Pool } = require('pg');
const connectionString = process.env.DB_URL;

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
