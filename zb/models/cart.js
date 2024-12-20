const mongoose = require("mongoose");
const Joi = require("joi");

// Cart Schema with Mongoose Validation
const cartSchema = mongoose.Schema({
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
});
const cartModel = mongoose.model("cart", cartSchema);


// Joi Validation Schema
const validateCart = (data) => {
    const cartSchema = Joi.object({
        user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // MongoDB ObjectId validation
        products: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).min(1).required(),
        totalPrice: Joi.number().min(0).required(),
    });

    return cartSchema.validate(data);
};


module.exports = { cartModel, validateCart };
