const mongoose = require("mongoose");
const Joi = require("joi");

// Order Schema with Mongoose Validation
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required"],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: [true, "At least one product is required"],
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"],
    },
    address: {
        type: String,
        required: [true, "Delivery address is required"],
        minlength: [10, "Address must be at least 10 characters long"],
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        required: [true, "Order status is required"],
        default: "pending",
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment",
        required: [true, "Payment ID is required"],
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delivery",
        required: [true, "Delivery ID is required"],
    },
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);

// Joi Validation Schema
const validateOrder = (data) => {
    const orderSchema = Joi.object({
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // MongoDB ObjectId validation
        products: Joi.array()
            .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
            .min(1)
            .required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(10).required(),
        status: Joi.string()
            .valid("pending", "processing", "shipped", "delivered", "cancelled")
            .required(),
        payment: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        delivery: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    });

    return orderSchema.validate(data);
};

module.exports = { orderModel, validateOrder };
