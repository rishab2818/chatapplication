// app.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const axios = require('axios');

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb+srv://prorishab:prorishab@cluster0.yywb5ef.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

// Socket.IO logic
// Create a mapping of sender IDs to sockets
const senderSockets = {};

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('New client connected');

  // Store the sender's socket in the mapping when a new message is received
  socket.on('newMessage', async (message) => {
    console.log('New message:', message);

    // Store the sender's socket
    senderSockets[message.sender] = socket;

    // Forward the message to the '/messages' route for storage
    try {
      await axios.post('http://localhost:3000/messages', message); // Assuming you're using axios for HTTP requests
    } catch (error) {
      console.error('Failed to forward message to route:', error);
      return; // Stop further processing if forwarding fails
    }

    // Emit the message to the sender's socket
    senderSockets[message.sender].emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');

    // Remove the sender's socket from the mapping when they disconnect
    for (const senderId in senderSockets) {
      if (senderSockets[senderId] === socket) {
        delete senderSockets[senderId];
        break;
      }
    }
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
