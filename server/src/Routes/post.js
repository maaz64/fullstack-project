const express = require('express');
const { createPost, getAllPost } = require('../Controllers/postController');
const passport = require('passport');
const router =  express.Router();



router.post('/create-post',passport.authenticate('jwt',{session:false}),createPost);
router.get('/get-all-post',passport.authenticate('jwt',{session:false}),getAllPost);



module.exports = router;