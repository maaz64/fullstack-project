const Post = require("../Models/post");
const ApiError = require("../Utils/ApiError");
const { ApiResponse } = require("../Utils/ApiResponse");

const createPost = async (req, res,next) => {
  try {
    const { content, title } = req.body;
    const { userId } = req.query;

    if (!content || !title ) {
      return next(new ApiError(400, "All fields are required"));
    }

    const post = await Post.create({
      title,
      content,
      user: userId,
    });

    if (!post) {
     
      return next(new ApiError(502, "Something went wrong while creating post"));
      
    }

    return res.status(201).json(ApiResponse(true,post,"Post Created Successfully"));
    
  } catch (error) {
    return next(new ApiError(500, "Something went wrong while creating post"));
  }
};

const getAllPost = async (_, res, next) => {
  try {
    const posts = await Post.find({}).populate('user', 'fullName');
    if (!posts) {
      return next(new ApiError(502, "Post not fetched from database due to some reason"));
    }

    return res.status(200).json(ApiResponse(true,posts,"All post fetched successfully"));
  } catch (error) {
    return next(new ApiError(500, "wrong while fetching the posts"));
    
  }
};

module.exports = {
    createPost,
    getAllPost,
}
