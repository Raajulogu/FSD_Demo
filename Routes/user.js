import express from "express";
import { User, generateJwtToken } from "../models/user.js";
import bcrypt from "bcrypt";


let router=express.Router();

router.post("/signup",async (req,res)=>{
    try {
        // find user already registered
        let user=await User.findOne({email:req.body.email})
        if(user) {
            return res.status(400).json({message:"Email already Exist"})
        }
        //Generate hashed Password link
        let salt =await bcrypt.genSalt(10)
        let hashedPassword=await bcrypt.hash(req.body.password,salt)
        
        //new password updation
        user=await new User({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            password:hashedPassword
        }).save();
        let token=generateJwtToken(user._id);
        res.status(201).json({message:"Successfully Loged in",token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.post("/login",async(req,res)=>{
    try {
        //validate user Exist
        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        let validatePassword =await bcrypt.compare(
            req.body.password,
            user.password
        )
        //validaet Password
        if(!validatePassword){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        //generate Token
        let token=generateJwtToken(user._id);
        res.status(200).json({message:"Logged in Successfully",token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
})

export let userRouter=router;