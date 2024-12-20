const mongoose = require("mongoose");
const Joi = require("joi");

// Address Schema with Mongoose Validation
const AddressSchema = mongoose.Schema({
    state: {
        type: String,
        required: [true, "State is required"],
        minlength: [2, "State must be at least 2 characters long"]
    },
    zip: {
        type: Number,
        required: [true, "ZIP code is required"],
        min: [10000, "ZIP code must be at least 5 digits"],
        max: [999999, "ZIP code must be at max 6 digits only"]
    },
    city: {
        type: String,
        required: [true, "City is required"],
        minlength: [2, "City must be at least 2 characters long"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        minlength: [5, "Address must be at least 5 characters long"]
    },
});
// User Schema with Mongoose Validation
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [30, "Name cannot exceed 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
        },
        password: {
            type: String,
            minlength: [6, "Password must be at least 6 characters long"]
        },
        phone: {
            type: Number,
            validate: {
                validator: (v) => /^(\d{10})$/.test(v),
                message: "Phone number must be a 10-digit number"
            },
        },
        addresses: {
            type: [AddressSchema],
        },
    },
    { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);


// Joi Validation Schema
const validateUser = (data) => {
    const addressSchema = Joi.object({
        state: Joi.string().min(2).required(),
        zip: Joi.number().min(10000).required(),
        city: Joi.string().min(2).required(),
        address: Joi.string().min(5).required(),
    });

    const userSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8),
        phone: Joi.string().length(10).pattern(/^\d+$/),
        addresses: Joi.array().items(addressSchema).min(1).required(),
    });

    return userSchema.validate(data);
};


module.exports = { userModel, validateUser };
