const express = require("express");
var mongoose = require('mongoose');
const Reply = require("../models/Reply");

const replyRouter = express.Router();

replyRouter.get('/allReplies/:id', async (req, res) => {
    console.log(req.params.id) ;
    try {
        const replies = await Reply.find({ commentId: req.params.id });
        console.log(replies) ;
        res.status(201).json({replies});
    } catch (err) {
        res.status(501).json({ message: "reply not found" });
    }
});


replyRouter.get('/:id', async (req, res) => {
    //console.log(req.params.id);

    //mongoose.Types.ObjectId.isValid(req.params.id);

    try {
        const createdReply = await Reply.findById(req.params.id);
        res.status(201).json({ createdReply });

    } catch (err) {
        res.status(404).json({ message: 'reply Not Found' });
    }

});


replyRouter.post("/postReply", async (req, res) => {

    try {
        const createdReply = await Reply.create(req.body);
        res.status(201).json({ createdReply });
    } catch (err) {
        res.status(501).json({ message: "error" });
    }

});


replyRouter.delete("/deleteReply/:id", async (req, res) => { //     /api/replies/deleteReply/id
    console.log(req.params.id);

    try {
        const deletedReply = await Reply.findOneAndDelete({ _id: req.params.id });
        if (deletedReply == null)
            res.status(404).json({ message: `No reply with such id ${req.params.id}` });
        else
            res.status(200).json({ deletedTask });

    } catch (err) {
        res.status(500).json({ message: err });
    }
})



module.exports = replyRouter;