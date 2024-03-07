const jwt = require('jsonwebtoken');
const User = require('../Models/user');

module.exports.verifyAcessToken = async (req, res, next) => {
  const incomingAccessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!incomingAccessToken) {
    return res.status(401).json({
      message: "Unauthorised request",
      data: {},
    });
  };


  const decodedUser = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
  const user = await User.findById(decodedUser?.id).select('-password -refreshToken'); 

  if(!user){
    return res.status(401).json({
        message: "Invalid Acess Token",
        data: {},
    });
  }

  req.user = user;
  next();
};
