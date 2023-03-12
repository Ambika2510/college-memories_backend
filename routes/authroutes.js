const express = require('express')
const Authorization = require('../middleware/Authorization')
const {
    signupUser,
    loginUser,
    updatePassword
} = require('../controllers/authcontroller')

const router = express.Router()
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/updatepassword", Authorization, updatePassword)
module.exports = router