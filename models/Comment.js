const mongoose = require("mongoose");

const comment = new mongoose.Schema({
    commentContent: { type: String, required: true },
    postId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const Comment = mongoose.model('Comment', comment);

module.exports = Comment; 