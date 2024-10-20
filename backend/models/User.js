// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // This will store the image URI
    default: 'https://www.example.com/default-profile-image.png', // Set default to null if no image is uploaded
  },
}, { collection: 'appusersinfos' }); // Explicitly specify the collection name

// Pre-save hook to hash passwords before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
