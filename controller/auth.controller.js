import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
    // Implement sign-up logic here

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {username, email, password} = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if(existingUser){
            const error = new Error("User with this email already exists");
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create([{
            name : username,
            email,
            password : hashedPassword
        }], {session});

        const token = jwt.sign({UserId : newUser[0]._id}, JWT_SECRET, {expiresIn : JWT_EXPIRE_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success : true,
            message : "User registered successfully",
            data : {    
                token,
                user : newUser[0],
            }
        });   

    }catch(err){
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

export const signIn = async (req, res, next) => {
    try{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({UserId : user._id}, JWT_SECRET, {expiresIn : JWT_EXPIRE_IN});

    res.status(200).json({
        success : true,
        message : "User signed in successfully",
        data : {
            token,
            user,
        }
    });
    }catch(error){
        next(error);
    }  
}

export const signOut = (req, res, next) => {
    
}