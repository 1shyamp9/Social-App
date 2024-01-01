import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId Required"],
    },
    desc: {
        type: String,
        required: [true, "Please Enter Your Description"],
        minLength: [4, "Description should have more than 4 characters"],
        maxLength: [500, "Description should have less than 500 characters"],
    },
    img: {
        type: String,
        default: "",
    },
    likes: {
        type: Array,
        default: [],
    },
    // comment: {
    //     type: Array,
    //     default:[],
    // }, 
    // comment: [{
    //     id: {
    //         type: String,
    //         default: ""
    //     },
    //     text: {
    //         type: String,
    //         default: "",
    //     },
    // }]
    // // },
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);