const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');
// const moment = require("moment");
const movieLikeSchema = mongoose.Schema({
    movieId: {
        type: String
    },
    movieTitle: {
        type: String,
    },
    runtime: {
        type: Number,
    },
    vote_average: {
        type: String,
    },
    userId : {
        type : String,
    }
});

const MovieLike = mongoose.model('MovieLike', movieLikeSchema);
module.exports = { MovieLike }