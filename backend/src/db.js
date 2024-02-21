// db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'hello_rishab',
  password: 'hello_rishab',
  database: 'hello_rishab'
});

function query(sql, params, callback) {
  pool.query(sql, params, (error, results) => {
    callback(error, results);
  });
}

module.exports = {
  query
};
