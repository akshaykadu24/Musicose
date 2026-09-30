const express = require("express")
const { cartCreateMiddleware } = require("../middlewares/cart.create.middleware")
const { CartModel } = require("../modules/cart.model")

const cartRoutes = express.Router()

cartRoutes.get("/",async(req,res)=>{
    try {
        // Return only the logged-in user's cart
        let products = await CartModel.find({user:req.body.user})
        res.send({products:products})
    } catch (err) {
        res.send({msg:"error while getting admin data",error:err})
    }
})
cartRoutes.use("/create/:id",cartCreateMiddleware)

cartRoutes.post("/create/:id",async(req,res)=>{
    
    // console.log((payload[0]._id).valueOf(),"llll")
    let data = req.body

    try {
        // If this user already has the product, increase quantity instead of adding a new row
        let existing = await CartModel.findOne({user:data.user, productId:data.productId})
        if(existing){
            existing.quantity = (existing.quantity || 1) + 1
            await existing.save()
            return res.send({msg:"product quantity updated in cart"})
        }

        let newProduct = new CartModel(data)
        await newProduct.save()
        res.send({msg:"product added in cart"})
    } catch (err) {
        res.send({msg:"err while adding product in cart",error:err})
    }
})


cartRoutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    let quantity = Math.max(1, Math.min(10, Number(req.body.quantity) || 1))

    try {
        // Only the owner of this cart row can change it, and only its quantity
        let updated = await CartModel.findOneAndUpdate({_id:id, user:req.body.user}, {quantity})
        if(!updated){
            return res.status(404).send({msg:"cart item not found"})
        }
        res.send({msg:"product Updated successfully"})
    } catch (err) {
        res.send({msg:"err while updating product in cart",error:err})
    }
})

// Empty the logged-in user's cart (used after an order is placed)
cartRoutes.delete("/clear",async(req,res)=>{
    try {
        let result = await CartModel.deleteMany({user:req.body.user})
        res.send({msg:"cart cleared", deleted:result.deletedCount})
    } catch (err) {
        res.status(500).send({msg:"err while clearing cart"})
    }
})

cartRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
 
    try {
        // Only the owner of this cart row can remove it
        let deleted = await CartModel.findOneAndDelete({_id:id, user:req.body.user})
        if(!deleted){
            return res.status(404).send({msg:"cart item not found"})
        }
        res.send({msg:"product Deleted from cart"})
    } catch (err) {
        res.send({msg:"err while Deleting product from cart",error:err})
    }
})


module.exports = {cartRoutes}