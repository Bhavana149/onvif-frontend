const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors'); // Import cors package

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors()); // Enable CORS for all routes

// WebSocket server
wss.on('connection', function connection(ws) {
  console.log('WebSocket connected');

  ws.on('message', function incoming(message) {
    console.log('Received message from client:', message);

    try {
      const data = JSON.parse(message);
      if (data.rtspUrl) {
        // Start streaming the RTSP URL
        // Implement your streaming logic here
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', function close() {
    console.log('WebSocket disconnected');
  });
});

// Start the HTTP server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
