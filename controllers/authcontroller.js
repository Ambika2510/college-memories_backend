const User = require("../models/usermodel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
//JWT
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//loginUser
const loginUser = async(req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password)
            const token = createToken(user._id)
            const id = user._id

            res.status(200).json({ id, token })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    //signupUser
const signupUser = async(req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        url

    } = req.body;
    try {
        const picturePath = url

        const user = await User.signup(
            firstname,
            lastname,
            email,
            password,
            picturePath
        );
        const id = user._id;
        const token = createToken(user._id);

        res.status(200).json({ id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { loginUser, signupUser };