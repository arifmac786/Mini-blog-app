import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcryptjs'
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'

export const registerUser = asyncHandler(async (req,res)=>{
    const {fullname,username,email,password} = req.body;
   
    if(!fullname || !username || !email || !password){
        throw new ApiError(400,"All fields are required")
    }

    const isExist = await User.findOne({email})
    
    if(isExist){
        throw new ApiError(400 , "User already exists")
    }

    const hashedPassword =await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        fullname,
        email,
        password:hashedPassword
    })

    const resUser = await User.findById(user._id).select("-password")

    if(!resUser){
        throw new ApiError(400,"Registration failed")
    }

    return res.status(201).json(
        new ApiResponse(201 , "User registration successful" , resUser)
    )

})

export const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    

    if(!email || !password){
        throw new ApiError(400,"All fields are required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"User not found")

    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new ApiError(400,"Invalid Password")
    }

    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    
    return res.status(200).json(
        new ApiResponse(200,"User logged In Successfully",user,token )
    )


})

export const getMe = asyncHandler(async (req,res)=>{
    return res.status(200).json(
        new ApiResponse(200,"User fetched successfully",req.user)
    )
})

 