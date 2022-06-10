const mongoose = require("mongoose");

const message = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        numTel: { type: Number, required: true },
        message: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Message = mongoose.model('Message', message);

module.exports = Message; 