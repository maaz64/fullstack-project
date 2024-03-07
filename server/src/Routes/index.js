const express = require('express');
const { Home } = require('../Controllers/userController');


const router =  express.Router();

router.get('/',Home);


module.exports = router;