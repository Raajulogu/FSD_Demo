import express from "express";
import { dbConnection } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import  {userRouter}  from "./Routes/user.js";
import { notesRouter } from "./Routes/notes.js";
import { isAuthenticated } from "./Controllers/auth.js";

//Configure env
dotenv.config();
let PORT=process.env.PORT;
let app=express();
//middlewares
app.use(express.json());
app.use(cors());
//db connection
dbConnection();

//routes
app.use("/api/user",userRouter);
app.use("/api/notes",isAuthenticated,notesRouter)


//server Connection
app.listen(PORT,()=>console.log(`Server running in localhost:${PORT}`))