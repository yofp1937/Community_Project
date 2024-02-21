const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postnum:{
        ref: "Post",
        type: mongoose.SchemaTypes.ObjectId,
    },
    content:{
        type: String,
    },
    author:{
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
    date:{
        type: String,
    },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;