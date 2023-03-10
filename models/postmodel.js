const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    location: String,
    description: {
        type: String,
        required: true
    },
    picturePath: String,

    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }



}, { timestamps: true });
module.exports = mongoose.model("Postblog", postSchema);