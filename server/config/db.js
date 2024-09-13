import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const connectDB=async()=>{
    await mongoose.connect(process.env.dblink).then(()=>console.log("db is connected"));

}