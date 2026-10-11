
const mongoose = require('mongoose');
const crypto = require('crypto');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    },

    paymentStatus: {
        type: String,
        enum: ['paid', 'not_paid'],
        default: 'not_paid'
    },

    amount: {
        type: Number,
        required: true
    },

    // Unique identifier for the digital ticket
    ticketToken: {
        type: String,
        unique: true,
        sparse: true,
        default: () => crypto.randomBytes(32).toString('hex')
    },

    // Whether the ticket has been used for entry
    checkedIn: {
        type: Boolean,
        default: false
    },

    checkedInAt: {
        type: Date,
        default: null
    },

    bookedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
