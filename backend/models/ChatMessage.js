const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);