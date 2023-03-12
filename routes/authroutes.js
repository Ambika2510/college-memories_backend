const express = require('express')
const {
    signupUser,
    loginUser,
    updatePassword
} = require('../controllers/authcontroller')

const router = express.Router()
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/updatepassword", updatePassword)
module.exports = router