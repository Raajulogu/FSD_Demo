import jwt from "jsonwebtoken";
import { User } from "../models/user.js";


let isAuthenticated=async(req,res,next)=>{
    let token;
    if(req.headers){
        try {
            token=req.headers["x-auth-token"];
            let decode=jwt.verify(token,process.env.SECRET_KEY)
            
            req.user=await User.findById(decode.id).select("_id name email")
            console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            return res.status(400).json({message:"Invalid Authorization"})
        }
    }
    if(!req.headers){
        return res.status(400).json({message:"Access Denied"})
    }
    }
    

export {isAuthenticated}