const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const {authMiddleware} = require('../middleware/auth'); // For protected routes

// Get all chat messages
router.get('/', async (req, res) => {
    try {
      const messages = await ChatMessage.find()
        .populate('userId', 'name')
        .populate('upvotes') // Populate userId with name
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

  router.post('/:messageId/upvote', authMiddleware, async (req, res) => {
    try {
      console.log('Received messageId:', req.params.messageId);
      const message = await ChatMessage.findById(req.params.messageId);
      if (!message) return res.status(404).json({ error: 'Message not found' });
  
      const userId = req.user.id;
      if (message.userId.toString() === userId) {
        return res.status(400).json({ error: 'You cannot upvote your own message' });
      }
  
      const hasUpvoted = message.upvotes.includes(userId);
  
      if (hasUpvoted) {
        message.upvotes = message.upvotes.filter((id) => id.toString() !== userId);
      } else {
        message.upvotes.push(userId);
      }
  
      await message.save();
  
      // Return the updated message with the full upvotes array
      res.status(200).json({ _id: message._id, upvotes: message.upvotes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upvote message' });
    }
  });

module.exports = router;
