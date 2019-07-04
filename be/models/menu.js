const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        'author': {
            type: String,
            default: ""
        },
        'content': {
            type: String,
            default: ""
        },
        'date': {
            type: Date,
            default: Date.now()
        }
    }
);

const menuSchema = new mongoose.Schema(
    {
        'name': {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        'like': {
            type: Number,
            default: 0
        },
        'dislike': {
            type: Number,
            default: 0
        },
        'frequency': [String],
        'comments': [commentSchema]
    }
);

module.exports = {
    'commentSchema': mongoose.model("Comment", commentSchema),
    'menuSchema': mongoose.model("Menu", menuSchema)
};
