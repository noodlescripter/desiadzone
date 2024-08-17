// models/Product.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  userId: {
    type: String,
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
    imageKey: {type: String},
    url: {type: String}
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
  },
  userName:{
    type: String, 
    required: true
  },
  email: {
    type: String
  },
  status: {
    type: String,
    default: "Active",
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
