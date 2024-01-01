import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, 'Email Id must be Unique'],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password should have more than 6 characters"],
    },
    country: {
        type: String,
        required: [true, "Please Enter Your Country"],
        minLength: [3, "Country should have more than 3 characters"],
    },
    city: {
        type: String,
        required: [true, "Please Enter Your City"],
        minLength: [3, "City should have more than 3 characters"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Your Description"],
        minLength: [4, "Description should have more than 4 characters"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    gender: {
        type: Number,
        enum: [1, 2, 3]
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    },
},{timestamps:true});

export const User = mongoose.model('User', userSchema);