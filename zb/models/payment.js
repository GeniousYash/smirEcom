const mongoose = require("mongoose");
const Joi = require("joi");

// Payment Schema with Mongoose Validation
const paymentSchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: [true, "Order ID is required"],
    },
    amount: {
        type: Number,
        required: [true, "Payment amount is required"],
        min: [0, "Amount cannot be negative"],
    },
    method: {
        type: String,
        required: [true, "Payment method is required"],
    },
    status: {
        type: String,
        required: [true, "Payment status is required"],
    },
    transactionID: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });

const paymentModel = mongoose.model("payment", paymentSchema);

// Joi Validation Schema
const validatePayment = (data) => {
    const paymentSchema = Joi.object({
        order: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        method: Joi.string().required(),
        status: Joi.string().required(),
        transactionID: Joi.string().optional(),
    });

    return paymentSchema.validate(data);
};

module.exports = { paymentModel, validatePayment};
