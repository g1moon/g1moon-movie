const express = require('express');
const router = express.Router();
const {User} = require("../models/User");
const {auth} = require("../middleware/auth");
const {MovieLike} = require('../models/MovieLike');

//=================================
//             comment
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

// router()

module.exports = router;
