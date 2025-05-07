const express = require('express');
const { getAvailableCategories } = require('../controller/menu.controller');

const router = express.Router();

router.get('/:id/menu/available-categories', getAvailableCategories);

module.exports = router;