const Booking = require('../models/Booking');

// Get available time slots for a specific date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    
    // Define all possible time slots
    const allTimeSlots = [
      '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    // Find existing bookings for the date
    const existingBookings = await Booking.find({
      date: new Date(date),
      status: { $ne: 'cancelled' }
    });

    // Filter out booked slots
    const bookedSlots = existingBookings.map(booking => booking.timeSlot);
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots', error: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { date, timeSlot, packageType, clientName, clientEmail, clientPhone } = req.body;

    // Check if slot is already booked
    const existingBooking = await Booking.findOne({
      date: new Date(date),
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Create new booking
    const booking = new Booking({
      date: new Date(date),
      timeSlot,
      packageType,
      clientName,
      clientEmail,
      clientPhone
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get booking by ID
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
}; 