const mongoose = require('mongoose');
const Restaurant = require('../model/resturant.model')

async function getAvailableCategories(req, res) {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid restaurant ID format' });
    }

    const result = await Restaurant.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $unwind: '$menu' },
      { $match: { 'menu.isAvailable': true } },
      { 
        $group: { 
          _id: '$menu.category', 
          availableCount: { $sum: 1 }
        }
      },
      { 
        $project: {
          name: '$_id',
          availableCount: 1,
          _id: 0
        }
      },
      { $sort: { name: 1 } }
    ]);

    if (result.length === 0) {
      const restaurantExists = await Restaurant.exists({ _id: id });
      if (!restaurantExists) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
    }

    res.json({ categories: result });
  } catch (error) {
    console.error('Menu categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAvailableCategories };