const mongoose = require("mongoose");
const Joi = require("joi");

// Admin Schema with Mongoose Validation
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        required: [true, "Role is required"],
        default: "admin"
    },
}, {timestamps: true});
const adminModel = mongoose.model("admin", adminSchema);


// Joi Validation Schema
const validateAdmin = (data) => {
    const adminSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string().valid("admin", "superadmin", "editor").required(),
    });

    return adminSchema.validate(data);
};


module.exports = { adminModel, validateAdmin };
