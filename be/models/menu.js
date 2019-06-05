const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        like: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        }
    }
);

module.exports = mongoose.model("Menu", menuSchema);;
