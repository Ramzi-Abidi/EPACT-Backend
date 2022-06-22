const mongoose = require("mongoose");

const reply = new mongoose.Schema({
    replyContent: { type: String, required: true },
    commentId: { type: String, required: true },
    postId: { type: String, required: true },
    answerEmail: { type: String, required: true },
    name: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const Reply = mongoose.model('Reply', reply);

module.exports = Reply;