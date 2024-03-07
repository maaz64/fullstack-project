require('dotenv').config();
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}

const signUp =async (req,res)=>{

    try {
        const{username,email,password,confirm_password} = req.body;

        if(password != confirm_password)
        {
            return res.status(422).json({
                message:"password doesn't match",
                data:{}
            });
        }
    
        const userWithEmail = await User.findOne({email});
        const userWithUsername = await User.findOne({username});
    
        if(userWithEmail || userWithUsername)
        {
            return res.status(409).json({
                message:"user already registered!!!",
                data:{}
            }); 
        }
        else{
            const saltRounds = 10;
            const hashPassword =await bcrypt.hashSync(password, saltRounds);
    
            const newUser = await User.create({
                username,email,password:hashPassword
            })

    
            return res.status(201).json({
                message:"Success",
                data:{newUser}
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error?.message || "Internal Server Error",
            data:{},
            error
        });
        
    }

 

}

const generateAcessTokenAndRefreshToken = async(userId)=>{

        const user = await User.findById(userId);
        const accessToken = jwt.sign({email:user.email, id:user._id}, process.env.ACCESS_TOKEN_SECRET_KEY ,{expiresIn:"1h"});
        const refreshToken = jwt.sign({email:user.email, id:user._id}, process.env.REFRESH_TOKEN_SECRET_KEY ,{expiresIn:"7d"});

        
        const updatedTokenUser = await User.findByIdAndUpdate(user._id,{
            refreshToken
        });
    
        return{
            accessToken,refreshToken
        }
}

const signIn =async (req,res)=>{

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Missing Email/Password",
                data:{}
            })
        }

        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                message:"Invalid credentials",
                data:{}
            })
        }
    
        const isPassMatch =await bcrypt.compare(password, user.password);
    
        if(!isPassMatch)
        {
            return res.status(401).json({
                message:"Invalid email/password",
                data:{}
            })
        }
    
        const {accessToken,refreshToken} =await generateAcessTokenAndRefreshToken(user._id);

        if(!accessToken || !refreshToken){
            return res.status(500).json({
                message:"Something went wrong while generating token",
                data:{},
            })
        }

    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message:"Sign in successfully",
            data:{
                username:user.username,
                userId:user._id,
                accessToken,
                refreshToken
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            data:{},
            error
        });

        
    }

}


const refreshToken = async(req,res)=>{

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if(!incomingRefreshToken){
        return res.status(401).json({
            message:"Unauthorised request",
            data:{},
        });
    };

 try {
       const decodedUser = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
       const tokenUser = await User.findById(decodedUser.id); 
   
       if(!tokenUser){
           return res.status(401).json({
               message:"Invalid Refresh Token",
               data:{},
           });
       }
   
       if(tokenUser.refreshToken !== incomingRefreshToken){
           return res.status(401).json({
               message:"Refresh Token Expired Or Used",
               data:{},
           });
       }
   
       const {accessToken, refreshToken} = await generateAcessTokenAndRefreshToken(tokenUser._id);

       if(!accessToken || !refreshToken){
        return res.status(500).json({
            message:"Something went wrong while generating token",
            data:{},
        })
        }

       
       return res
           .status(200)
           .cookie("accessToken", accessToken, options)
           .cookie("refreshToken", refreshToken, options)
           .json({
               message:"Token Refresh Successfully",
               data:{refreshToken, accessToken},
       })
 } catch (error) {
    return res.status(401).json({
        message:error?.message || "Invalid Refresh Token",
        data:{},
        error
    });
 }
}


const logOut = async(req,res)=>{

    const loggedInuser = req.user;
    const tokenDeletedUser =await User.findByIdAndUpdate(loggedInuser._id,
        {
            refreshToken : undefined
        },
        {
            new:true
        })


    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
        message:"User Logged Out",
        data : {}
    });
}

module.exports = {
    signUp,
    signIn,
    refreshToken,
    logOut
}