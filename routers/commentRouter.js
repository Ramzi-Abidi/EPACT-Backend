const express = require("express");

const data = require("../data/data");
const Post = require("../models/postModel");

var mongoose = require('mongoose');
const Comment = require("../models/Comment");

const commentRouter = express.Router();

commentRouter.get('/allComments/:id', async (req, res) => {
    //console.log(req.params.id) ;

    const comments = await Comment.find({ postId: req.params.id });
    console.log(comments);

    res.status(201).send(comments);
});


commentRouter.get('/:id', async (req, res) => {
    //console.log(req.params.id);

    //mongoose.Types.ObjectId.isValid(req.params.id);

    const post = await Post.findById(req.params.id);

    if (post)
        res.status(201).json(post);
    else
        res.status(404).json({ message: 'Post Not Found' });

});


commentRouter.post("/postComment", async (req, res) => {
    //the post doesn't exist :)
    //console.log(req.body);
    
    const createdComment = await Comment.create(req.body);

    if (createdComment)
        res.status(201).json({ createdComment });
    else
        res.status(501).json({ message: "error" });

});

module.exports = commentRouter;