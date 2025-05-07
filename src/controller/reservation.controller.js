const Reservation = require('../model/reservation.model');

async function createReservation(req, res) {
  try {
    const { restaurantId, tableId, reservationTime } = req.body;
    
    if (!restaurantId || !tableId || !reservationTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const startTime = new Date(reservationTime);
    if (isNaN(startTime.getTime())) {
      return res.status(400).json({ error: 'Invalid reservation time format' });
    }

    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const existingReservation = await Reservation.findOne({
      restaurantId,
      tableId,
      $or: [
        { 
          reservationTime: { $lte: startTime },
          endTime: { $gt: startTime }
        },
        { 
          reservationTime: { $lt: endTime },
          endTime: { $gte: endTime }
        },
        { 
          reservationTime: { $gte: startTime },
          endTime: { $lte: endTime }
        }
      ]
    });

    if (existingReservation) {
      return res.status(409).json({ 
        error: 'Conflict: Table already reserved for this time slot',
        conflictingReservation: {
          id: existingReservation._id,
          reservationTime: existingReservation.reservationTime,
          endTime: existingReservation.endTime
        }
      });
    }

    const reservation = new Reservation({
      restaurantId,
      tableId,
      reservationTime: startTime,
      endTime
    });

    await reservation.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: {
        id: reservation._id,
        restaurantId: reservation.restaurantId,
        tableId: reservation.tableId,
        reservationTime: reservation.reservationTime,
        endTime: reservation.endTime
      }
    });

  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createReservation };