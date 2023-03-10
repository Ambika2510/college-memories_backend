const express = require('express')
const router = express.Router()
const Authorization = require('../middleware/Authorization')
const {
    createPost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost,
    pushComment
} = require('../controllers/postcontroller')
    //middleware
    // router.use(Authorization)
    //routes
router.post('/create', createPost)
router.get('/getallpost', getAllPosts)
router.get('/getpost/:userid', getUserPosts)
router.patch('/updatepost/:id', updatePost)
router.delete('/deletepost/:id', deletePost)
router.patch('/pushcomment/:id', pushComment)
module.exports = router