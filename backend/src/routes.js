// routes.js
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./user');
const message = require('./message');

const app = express();
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { name, username, password, mobileNumber, email } = req.body;
  user.signup(name, username, password, mobileNumber, email, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'User signed up successfully' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  user.login(username, password, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});

app.post('/send-message', (req, res) => {
  const { senderId, recipientId, message } = req.body;
  message.sendMessage(senderId, recipientId, message, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Message sent successfully' });
  });
});

app.get('/messages/:userId', (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;

  message.getMessages(userId, limit, offset, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ messages: results });
  });
});

module.exports = app;
