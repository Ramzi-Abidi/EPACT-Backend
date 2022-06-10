const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        //_id:{type:String,required:true},
        title: { type: String, required: true },
        postContent: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post; 