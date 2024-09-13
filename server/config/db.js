import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://mirrahadctg:191054rahat@cluster0.y1iyu.mongodb.net/food-del').then(()=>console.log("db is connected"));

}