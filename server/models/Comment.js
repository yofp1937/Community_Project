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
    authorNickname:{ // 게시글을 불러올때 거기서 댓글의 작성자도 다시불러오면 성능에 부하가 생길거같아서 따로 컬럼을 하나 더 생성
        type: String,
    },
    date:{
        type: String,
    },
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;