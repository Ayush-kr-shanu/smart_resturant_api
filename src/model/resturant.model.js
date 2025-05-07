const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  menu: [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);