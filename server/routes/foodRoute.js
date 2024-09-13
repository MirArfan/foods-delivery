import express from 'express';
import { addFood, listFood, removeFood, updateFood, updateFoodPartial } from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter=express.Router();

// image storage engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload= multer({storage: storage});

foodRouter.post("/add",upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);


// update routes is not working
foodRouter.put("/updateinfo", upload.single("image"), updateFoodPartial);
foodRouter.patch("/update", upload.single("image"), updateFood);




export default foodRouter;