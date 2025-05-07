const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'Restaurant'
  },
  tableId: { 
    type: String, 
    required: true 
  },
  reservationTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

reservationSchema.index({ restaurantId: 1, tableId: 1, reservationTime: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);