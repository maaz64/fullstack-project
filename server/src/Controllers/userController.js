require("dotenv").config();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/ApiError");
const { ApiResponse } = require("../Utils/ApiResponse");

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const signUp = async (req, res, next) => {
  try {
    const { fullName, username, email, password, confirm_password } = req.body;

    if (!fullName || !username || !email || !password || !confirm_password) {
      return next(new ApiError(400, "All fields are required"));
    }

    if (password != confirm_password) {
      return next(new ApiError(400, "password doesn't match"));
    }

    const userAlreadyExisted = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userAlreadyExisted) {
      return next(new ApiError(409, "user already registered!!!"));
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hashSync(password, saltRounds);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json(
      ApiResponse(
        true,
        {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
        },
        "User created successfully"
      )
    );
  } catch (error) {
    return next(new ApiError(500, "Something went wrong while creating user"));
  }
};

const generateAcessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "7d" }
  );

  const updatedTokenUser = await User.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const signIn = async (req, res,next) => {
  try {
    const { email, username, password } = req.body;

    if (!(email || username) || !password) {
        return next(new ApiError(400, "All fields are required"));
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
        return next(new ApiError(401, "Invalid Credentials"));
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
        return next(new ApiError(400, "Password dosen't match"));
    }

    const { accessToken, refreshToken } =
      await generateAcessTokenAndRefreshToken(user._id);

    if (!accessToken || !refreshToken) {
    return next(new ApiError(502, "Something went wrong while generating token"));
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(ApiResponse(true,
        {
            username: user.username,
            userId: user._id,
            accessToken,
            refreshToken,
        },
        "Sign in successfully"
    ));
     
  } catch (error) {
    return next(new ApiError(500, "Something went wrong"));
  }
};

const refreshToken = async (req, res,next) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return next(new ApiError(401, "Unauthorised request"));
  }

  try {
    const decodedUser = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    const tokenUser = await User.findById(decodedUser.id);

    if (!tokenUser) {
    return next(new ApiError(401, "Invalid Refresh Token"));
    }

    if (tokenUser.refreshToken !== incomingRefreshToken) {
    return next(new ApiError(401, "Refresh Token Expired Or Used"));
   
    }

    const { accessToken, refreshToken } =
      await generateAcessTokenAndRefreshToken(tokenUser._id);

    if (!accessToken || !refreshToken) {
    return next(new ApiError(500, "Something went wrong while generating token"));
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(ApiResponse(
        true,
        {refreshToken, accessToken},
        "Token generated successfully"
      ));
  } catch (error) {

    return next(new ApiError(401, error?.message || "Invalid Refresh Token"));
  }
};

const logOut = async (req, res, next) => {
  const loggedInuser = req.user;
  const tokenDeletedUser = await User.findByIdAndUpdate(
    loggedInuser._id,
    {
      refreshToken: undefined,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(ApiResponse(true,{},"User Logged Out"));
    
}

module.exports = {
  signUp,
  signIn,
  refreshToken,
  logOut,
};
