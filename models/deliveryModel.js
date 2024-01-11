const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Delivey', deliverySchema)

