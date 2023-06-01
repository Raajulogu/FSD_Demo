import mongoose from "mongoose";
import jwt from "jsonwebtoken";


let userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:32,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        contact:{
            type:Number
        },
        password:{
            type:String,
            required:true
        }
    }
)

let generateJwtToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}

let User=mongoose.model("user",userSchema);
export {User,generateJwtToken}