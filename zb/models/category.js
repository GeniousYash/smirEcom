const mongoose = require("mongoose");
const Joi = require("joi");

// Category Schema with Mongoose Validation
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        minlength: [3, "Category name must be at least 3 characters long"],
        maxlength: [50, "Category name cannot exceed 50 characters"],
        unique: true,
    },
},
{timestamps: true}
);
const categoryModel = mongoose.model("category", categorySchema);


// Joi Validation Schema
const validateCategory = (data) => {
    const categorySchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    });

    return categorySchema.validate(data);
};


module.exports = { categoryModel, validateCategory };
