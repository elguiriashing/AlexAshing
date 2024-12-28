const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get available time slots
router.get('/available-slots', bookingController.getAvailableSlots);

// Create new booking
router.post('/', bookingController.createBooking);

// Get booking by ID
router.get('/:id', bookingController.getBooking);

// Update booking status
router.patch('/:id/status', bookingController.updateBookingStatus);

module.exports = router; 