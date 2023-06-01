import express from "express";
import { Notes } from "../models/notes.js";


let router=express.Router();




router.post("/add",async (req,res)=>{
    try {
        let postedDate=new Date().toJSON().slice(0,10);
        
        let notes=await new Notes(
            {...req.body,
                date:postedDate,
                user:req.user._id
            }
        ).save()
        if(!notes){
            return res.status(400).json({message:"Error in saving the File"})
        }
        res.status(200).json({message:"Notes Sved Successfully",data:notes})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error:"})
    }
})

export let notesRouter=router;