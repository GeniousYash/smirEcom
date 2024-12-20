const mongoose = require("mongoose");
const Joi = require("joi");

// Product Schema with Mongoose Validation
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        minlength: [3, "Category name must be at least 3 characters long"],
    },
    stock: {
        type: Number,
        required: [true, "Stock status is required"],
    },
    description: {
        type: String,
    },
    image: {
        type: Buffer,
        required: true
    },
}, { timestamps: true });
const productModel = mongoose.model("product", productSchema);


// Joi Validation Schema
const validateProduct = (data) => {
    const productSchema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().min(3).required(),
        stock: Joi.number().required(),
        description: Joi.string().optional(),
        image: Joi.buffer().required(),
    });

    return productSchema.validate(data);
};

module.exports = { productModel, validateProduct };
