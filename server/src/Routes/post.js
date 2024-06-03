const express = require('express');
const { createPost, getAllPost } = require('../Controllers/postController');
const passport = require('passport');
const { verifyAcessToken } = require('../Middleware/userMiddleware');
const router =  express.Router();


router.get('/',passport.authenticate('jwt',{session:false}),getAllPost);
router.post('/',verifyAcessToken,createPost);




module.exports = router;