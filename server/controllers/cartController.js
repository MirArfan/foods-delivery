import userModel from "../models/userModel.js"


//  add items to user cart
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData;

      if (!cartData[req.body.itemId]) {
         // If the item does not exist, set the quantity to 1
         cartData[req.body.itemId] = 1;
      } else {
         // If the item exists, increment its quantity
         cartData[req.body.itemId] += 1;
      }

      // Update the user cart in the database
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      res.json({ success: true, message: "Added to Cart" });
   } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error" });
   }
}



// remove items from user cart

const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData;

      if (cartData[req.body.itemId] > 1) {
         cartData[req.body.itemId] -= 1;
      } else {
         delete cartData[req.body.itemId];
      }
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      res.json({ success: true, message: "Removed form cart" });

   } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error" });

   }
}


// fetch user cart data
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData;
      res.json({ success: true, cartData })

   } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error" });

   }
}


export { addToCart, removeFromCart, getCart }
