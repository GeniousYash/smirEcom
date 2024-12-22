const mongoose = require("mongoose");
const Joi = require("joi");

// Payment Schema with Mongoose Validation
const paymentSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: [true, "Order ID is required"],
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    amount: {
        type: Number,
        required: [true, "Payment amount is required"],
    },
    currency: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "pending",
    }
}, { timestamps: true });

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = { paymentModel };
