const express = require('express');
const { searchRestaurants } = require('../controller/resturant.controller');

const router = express.Router();

router.get('/search', searchRestaurants);

module.exports = router;