const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    requried: true,
  },
  fullName: {
    type: String,
  }
})

module.exports = mongoose.model('User', userSchema)