const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');
// const moment = require("moment");

const commentSchema = mongoose.Schema({
    movie_id: {
        type: String
    },
    user_id: {
        type: String,
    },
    content: {
        type: String,
    }

});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment }