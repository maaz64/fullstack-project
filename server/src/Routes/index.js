const express = require('express');
const { signIn, signUp, refreshToken, logOut } = require('../Controllers/userController');
const { verifyAcessToken } = require('../Middleware/userMiddleware');

const router =  express.Router();

router.use('/post', require('./post'))

router.post('/sign-up',signUp);
router.post('/sign-in',signIn);
router.post('/refresh-token', refreshToken);
router.post('/logout',verifyAcessToken, logOut);


module.exports = router;