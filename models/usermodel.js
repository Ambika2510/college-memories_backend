const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number,
}, {
    timestamps: true,
});
//static signup method
userSchema.statics.signup = async function(
    firstname,
    lastname,
    email,
    password,
    picturePath
) {
    //validation
    if (!firstname || !lastname || !email || !password) {
        throw Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw Error("Invalid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error(
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
    }
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        firstname,
        lastname,
        email,
        password: hash,
        picturePath

    });
    return user;
};
//static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect Email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect Password");
    }
    return user;
};
module.exports = mongoose.model("bloguser", userSchema);