const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http'); // To create a server for Socket.IO
require('dotenv').config(); // Load environment variables

const authRoutes = require('./routes/auth'); // Import routes
const profileRoutes = require('./routes/profile'); // Import profile routes
const grievanceRoutes = require('./routes/grievance'); // Import grievance routes
const chatRoutes = require('./routes/chatRoutes'); // Chat routes

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins, restrict in production
    methods: ['GET', 'POST'],
  },
});

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // Profile routes added
app.use('/api/grievances', grievanceRoutes); // Grievance routes
app.use('/api/chat', chatRoutes); // Chat routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on DB connection failure
  });

// WebSocket Event Handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new_message', (message) => {
    io.emit('new_message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));