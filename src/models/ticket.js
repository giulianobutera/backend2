const mongoose = require('mongoose');
const crypto = require('crypto');

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        default: () => crypto.randomUUID()
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'purchase_datetime',
        updatedAt: false
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
