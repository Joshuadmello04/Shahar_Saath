const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referring to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Pending, In Progress, Resolved, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  file: {
    type: String, // The file path or URL of the uploaded file (if any)
  },
});

module.exports = mongoose.model('Grievance', grievanceSchema);
