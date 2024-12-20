const mongoose = require("mongoose");
const Joi = require("joi");

// Delivery Schema with Mongoose Validation
const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: [true, "Order ID is required"],
    },
    deliveryBoy: {
        type: String,
        required: [true, "Delivery boy's name is required"],
        minlength: [3, "Delivery boy's name must be at least 3 characters long"],
        maxlength: [50, "Delivery boy's name cannot exceed 50 characters"],
    },
    status: {
        type: String,
        enum: ["pending", "in-transit", "delivered", "cancelled"],
        required: [true, "Status is required"],
    },
    trackingURL: {
        type: String,
    },
    estimatedDeliveryTime: {
        type: Number,
        min: [1, "Estimated delivery time must be at least 1 hour"],
        max: [168, "Estimated delivery time cannot exceed 168 hours (1 week)"],
        required: [true, "Estimated delivery time is required"],
    },
},
{ timestamps: true }
);
const deliveryModel = mongoose.model("delivery", deliverySchema);


// Joi Validation Schema
const validateDelivery = (data) => {
    const deliverySchema = Joi.object({
        order: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // MongoDB ObjectId validation
        deliveryBoy: Joi.string().min(3).max(50).required(),
        status: Joi.string().valid("pending", "in-transit", "delivered", "cancelled").required(),
        trackingURL: Joi.string().uri().required(),
        estimatedDeliveryTime: Joi.number().min(1).max(168).required(),
    });

    return deliverySchema.validate(data);
};

module.exports = { deliveryModel, validateDelivery };
