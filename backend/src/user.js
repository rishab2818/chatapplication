// user.js
const db = require('./db');

function signup(name, username, password, mobileNumber, email, callback) {
  db.query('INSERT INTO users (name, username, password, mobile_number, email) VALUES (?, ?, ?, ?, ?)', [name, username, password, mobileNumber, email], callback);
}

function login(username, password, callback) {
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], callback);
}

module.exports = {
  signup,
  login
};
