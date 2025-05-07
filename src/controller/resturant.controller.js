const Restaurant = require('../model/resturant.model');

async function searchRestaurants(req, res) {
  try {
    const { cuisine, location, minRating, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const query = {};
    if (cuisine) query.cuisine = cuisine;
    if (location) query.location = location;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };

    const [total, results, availableCuisines] = await Promise.all([
      Restaurant.countDocuments(query),
      Restaurant.find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
      Restaurant.distinct('cuisine', query)
    ]);

    // Calculate total pages
    const pages = Math.ceil(total / limitNumber);

    res.json({
      results,
      total,
      page: pageNumber,
      pages,
      availableCuisines
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { searchRestaurants };