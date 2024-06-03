const express = require('express');
const { signIn, signUp, refreshToken, logOut } = require('../Controllers/userController');
const { verifyAcessToken } = require('../Middleware/userMiddleware');

const router =  express.Router();

router.use('/posts', require('./post'))

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/refresh-token', refreshToken);
router.post('/logout',verifyAcessToken, logOut);


module.exports = router;