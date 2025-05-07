const express = require("express");
const restaurantRoutes = require('./resturant.route');
const reservationRoutes = require("./reservation.route");
const menuRoute = require("./menu.route")

const router = express.Router();

router.use('/restaurants', restaurantRoutes);
router.use('/reservations', reservationRoutes);
router.use('/', menuRoute)

module.exports = router;