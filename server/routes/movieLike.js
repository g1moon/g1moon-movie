const express = require('express');
const router = express.Router();
const {User} = require("../models/User");
const {auth} = require("../middleware/auth");
const {MovieLike} = require('../models/MovieLike');

//=================================
//             MovieLike
//=================================
//
// router.post("/register", (req, res) => {
//
//     const user = new User(req.body);
//
//     user.save((err, doc) => {
//         if (err) return res.json({ success: false, err });
//         return res.status(200).json({
//             success: true
//         });
//     });
router.post('/getLikeState', (req, res) => {
    MovieLike.find({ "movieId": req.body.movieId, "userId": req.body.userId })
        .exec((err, info) => {
            console.log(info);
            if (err) return res.status(400).send(err)
            // 그다음에   프론트에  다시   숫자 정보를 보내주기
            let result = false;
            if (info.length !== 0) {
                result = true
            }
            res.status(200).json({ success: true, like: result, movieLikeNum: info.length})
        })
})

router.post('/countLike', (req, res) => {

    MovieLike.find({'movieId': req.body.movieId})
        .exec((err, info) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(200).json({success : true, like_cnt: info.length})
        });
});

router.post('/clickLike', (req, res) => {

    const MovieLikeDb = new MovieLike(req.body);
    //DB에 저장하는 함수
    MovieLike.findOne(req.body)
        .exec((err, info) => {
            if (err) {
                return res.status(400).send(err);
            }
            if (info) {
                console.log('중복이라 저장하지 않')
                return res.status(400).json({success: false})
            } else {
                console.log('저장');
                MovieLikeDb.save((err, doc) => {
                    if (err) return res.status(400).send(err)
                    return res.status(200).json({success: true})
                });
            }
        });
});

router.post('/unClickLike', (req, res) => {
    console.log('unClickLike');
    MovieLike.findOneAndRemove({movieId: req.body.movieId, userId: req.body.userId})
        .exec((err, info) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                return res.status(200).json({success: true})
            }
        });


});
module.exports = router;
