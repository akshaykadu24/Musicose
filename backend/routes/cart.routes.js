const express = require("express")
const { cartCreateMiddleware } = require("../middlewares/cart.create.middleware")
const { CartModel } = require("../modules/cart.model")

const cartRoutes = express.Router()

cartRoutes.get("/",async(req,res)=>{
    try {
        let products = await CartModel.find()
        res.send({products:products})
    } catch (err) {
        res.send({msg:"error while getting admin data",error:err})
    }
})
cartRoutes.use("/create/:id",cartCreateMiddleware)

cartRoutes.post("/create/:id",async(req,res)=>{
    
    // console.log((payload[0]._id).valueOf(),"llll")
    let data = req.body
    console.log(data,"new card data")

    try {
        let newProduct = new CartModel(data)
        await newProduct.save()
        res.send({msg:"product added in cart"})
    } catch (err) {
        res.send({msg:"err while adding product in cart",error:err})
    }
})


cartRoutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    let payload = req.body
        
    try {
         await CartModel.findByIdAndUpdate(id,payload)
        res.send({msg:"product Updated successfully"})
    } catch (err) {
        res.send({msg:"err while updating product in cart",error:err})
    }
})

cartRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
 
    try {
         await CartModel.findByIdAndDelete(id)
        res.send({msg:"product Deleted from cart"})
    } catch (err) {
        res.send({msg:"err while Deleting product from cart",error:err})
    }
})


module.exports = {cartRoutes}