const express = require('express');
const router = express.Router();
const {
    bookEvent,
    confirmBooking,
    getMyBookings,
    cancelBooking,
    sendBookingOTP,
    verifyTicket
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.post('/send-otp', protect, sendBookingOTP);
router.post('/', protect, bookEvent);
router.put('/:id/confirm', protect, admin, confirmBooking);
router.get('/my', protect, getMyBookings);
// Verify QR ticket (admin only)
router.post('/verify-ticket', protect, admin, verifyTicket);
router.delete('/:id', protect, cancelBooking);

module.exports = router;
