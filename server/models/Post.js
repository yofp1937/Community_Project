const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{ // 글 제목(최대 20글자 제한)
        type: String,
        trim: true,
        maxLength: 20,
    },
    content:{ // 내용
        type: String,
    },
    date:{ // 작성 날짜
        type: String,
    },
    author:{ // 작성자
        ref: "User",
        type: mongoose.SchemaTypes.ObjectId,
    },
    views:{ // 조회수
        type: Number,
        default: 0,
    },
    comments:[{ // 댓글
        ref: "Comments",
        type: mongoose.SchemaTypes.ObjectId,
    }],
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;