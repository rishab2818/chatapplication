const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:3000'); // Replace 'http://localhost:3000' with your server URL

socket.on('connect', () => {
  console.log('Connected to server');
  
  let sender = '65d44948b725a9063cfb73c3'; // Sender ID
  let receiver = '65d44954b725a9063cfb73c5'; // Receiver ID

  // Simulate sending messages asynchronously every 10 seconds
  setInterval(() => {
    // Send message from current sender to current receiver
    sendMessage(sender, receiver, 'Message from ' + sender + ' to ' + receiver);

    // Swap sender and receiver IDs
    [sender, receiver] = [receiver, sender];
  }, 1000); // Send messages every 10 seconds
});

// Function to send message
function sendMessage(sender, receiver, message) {
  socket.emit('newMessage', {
    sender: sender,
    receiver: receiver,
    text: message
  });
}

// Event handler for receiving messages
socket.on('newMessage', (message) => {
  console.log(`New message received from ${message.sender} to ${message.receiver}: ${message.text}`);
});
