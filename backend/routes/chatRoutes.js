const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const {authMiddleware} = require('../middleware/auth'); // For protected routes

// Get all chat messages
router.get('/', async (req, res) => {
    try {
      const messages = await ChatMessage.find()
        .populate('userId', 'name') // Populate userId with name
        .sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

// Send a new message
router.post('/', authMiddleware, async (req, res) => {
    const { text } = req.body;
    console.log('User ID:', req.user.id); // Check if the user ID is being passed 
    try {
      // Save the message with the userId
      const message = await ChatMessage.create({
        text,
        userId: req.user.id, // Store the userId (referencing the User model)
      });
  
      // Send back the message populated with user data (name)
      const populatedMessage = await message.populate('userId', 'name');
      res.status(201).json(populatedMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

module.exports = router;
