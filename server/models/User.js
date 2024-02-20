const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id:{
        type: String,
        unique: 1,
        trim: true,
        minLength: 4,
    },
    password:{
        type: String,
    },
    nickname:{
        type: String,
        unique: 1,
        minLength: 2,
        maxLength: 12,
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;