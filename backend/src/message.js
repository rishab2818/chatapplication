// message.js
const db = require('./db');

function sendMessage(senderId, recipientId, message, callback) {
  db.query('INSERT INTO messages (sender_id, recipient_id, message) VALUES (?, ?, ?)', [senderId, recipientId, message], callback);
}

function getMessages(userId, limit, offset, callback) {
  db.query('SELECT * FROM messages WHERE recipient_id = ? LIMIT ? OFFSET ?', [userId, limit, offset], callback);
}

module.exports = {
  sendMessage,
  getMessages
};
