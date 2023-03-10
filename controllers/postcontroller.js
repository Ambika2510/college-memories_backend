const Post = require('../models/postmodel');
const User = require('../models/usermodel');

const mongoose = require('mongoose');
const { findById } = require('../models/postmodel');
//create a post
const createPost = async(req, res) => {
        try {
            const { description, url, userid } = req.body;
            const picturePath = url;
            const user = await User.findById(
                userid);

            const firstname = user.firstname;
            const lastname = user.lastname;
            const newPost = await Post.create({
                userid,
                firstname: user.firstname,
                lastname: user.lastname,
                description,
                picturePath,
                userPicturePath: user.picturePath,
                likes: {},
                comments: []
            });
            res.status(200).json(newPost);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    //get all posts
const getAllPosts = async(req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: -1 }) //newest come first;

            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    //get a user post
const getUserPosts = async(req, res) => {
        try {
            const { userid } = req.params;
            const post = await Post.find({ userid }).sort({ createdAt: -1 });

            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    //update a post
const updatePost = async(req, res) => {
        try {
            const { id } = req.params;
            const { userid } = req.body;
            console.log(id, userid)
            const post = await Post.findById(id);

            const isliked = post.likes.get(userid);
            if (isliked) {
                post.likes.delete(userid);
            } else {
                post.likes.set(userid, true);
            }

            // await post.save(); fidnbyidandupdate is little bit faster than this .save method because findbyidandupdate update only those part which have to update i.e. reload only those part which have to update and .save method update all the part of the document that is reload all the document and update it.
            const newpost = await Post.findByIdAndUpdate(id, { likes: post.likes }, {
                new: true
            });
            res.status(200).json(newpost);

        } catch (err) {
            console.log(err.message)
            res.status(404).json({ message: err.message });
        }
    }
    //delete a post
const deletePost = async(req, res) => {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such post' })
        }
        const post = await Post.findOneAndDelete({ _id: id })

        if (!post) {
            return res.status(400).json({ error: 'No such post' })
        }

        res.status(200).json(post)
    }
    //push comment in post
const pushComment = async(req, res) => {
    try {
        const { id } = req.params;
        const { comment, url, username } = req.body;
        const post = await Post.findById(id);
        const data = {
            comment,
            commentuser: url,
            commentusername: username
        }
        post.comments.unshift(data);

        const newpost = await Post.findByIdAndUpdate(id, { comments: post.comments }, {
            new: true
        });
        res.status(200).json(newpost);
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ message: err.message });
    }
}

module.exports = { createPost, getAllPosts, getUserPosts, updatePost, deletePost, pushComment };