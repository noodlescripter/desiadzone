// models/Product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photoURLs: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
