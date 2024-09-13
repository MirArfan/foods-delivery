// import foodModel from "../models/foodModel.js";
import fs from 'fs'
import foodModel from '../models/foodModel.js';




// //add food item
const addFood = async (req, res) => {

    let image_fileName = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_fileName,

    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
}


//get all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "food item removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"error"})
    }
}

// update food item
const updateFood = async (req, res) => {
    try {
        // Find the food item by its ID
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Update fields
        food.name = req.body.name || food.name;
        food.description = req.body.description || food.description;
        food.price = req.body.price || food.price;
        food.category = req.body.category || food.category;

        // Check if a new image is uploaded
        if (req.file) {
            // Remove old image
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });

            // Set new image filename
            food.image = req.file.filename;
        }

        // Save updated food item
        await food.save();
        res.json({ success: true, message: "Food item updated", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }
}


// update food item partially
const updateFoodPartial = async (req, res) => {
    try {
        // Find the food item by its ID
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Update only the provided fields
        if (req.body.name) food.name = req.body.name;
        if (req.body.description) food.description = req.body.description;
        if (req.body.price) food.price = req.body.price;
        if (req.body.category) food.category = req.body.category;

        // Check if a new image is uploaded
        if (req.file) {
            // Remove old image
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });

            // Set new image filename
            food.image = req.file.filename;
        }

        // Save the updated food item
        await food.save();
        res.json({ success: true, message: "Food item updated", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }
}


export { addFood, listFood , removeFood , updateFood, updateFoodPartial}