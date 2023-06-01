import mongoose from "mongoose";


export function dbConnection(){
    let params={
        useNewUrlParser:true,
        useUnifiedTopology:true,

    }
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/interview",params)
        console.log("Database Connected Succesfully")
    } catch (error) {
     console.log("Error connecting DB----",error)   
    }
}