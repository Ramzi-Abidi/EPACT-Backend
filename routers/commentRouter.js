const express = require("express");
const Post = require("../models/postModel");
var mongoose = require('mongoose');
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");

const commentRouter = express.Router();

commentRouter.get('/allComments/:id', async (req, res) => {
    //console.log(req.params.id) ;

    const comments = await Comment.find({ postId: req.params.id });
    //console.log(comments);

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


commentRouter.delete("/:id", async (req, res) => { // /api/deleteComment/:id
    console.log(req.params.id);

    try {
        const deletedTask = await Comment.findOneAndDelete({ _id: req.params.id });
        const deletedReplies = await Reply.deleteMany({ commentId: req.params.id });
        if (deletedTask == null)
            res.status(404).json({ message: `No post with such id ${req.params.id}` });
        else
            res.status(200).json({ deletedTask });

    } catch (err) {
        res.status(500).json({ message: err });
    }
})



module.exports = commentRouter;