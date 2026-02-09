import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcryptjs'
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req,res)=>{
    const {fullname,username,email,password} = req.body;
   
    if(!fullname || !username || !email || !password){
        throw new ApiError(400,"All fields are required")
    }

    const isExist = await User.findOne({email})
    
    if(isExist){
        throw new ApiError(400 , "User already exists")
    }

    const hashedPassword = bcrypt.hash(password,10)

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