const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    email: {
        type: String
    },
    snsId: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);