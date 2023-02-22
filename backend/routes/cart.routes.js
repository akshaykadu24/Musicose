const express = require("express")
const { cartMiddleware } = require("../middlewares/cart.middleware")
const { AdminProductModel } = require("../modules/admin.product.model")
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
cartRoutes.use("/create/:id",cartMiddleware)
cartRoutes.post("/create/:id",async(req,res)=>{
    let id = req.query.id
    // let data = await AdminProductModel.find(id)
    // req.body = data[0]
    let newcartdata = req.body._id
   
    console.log(newcartdata)
     
    try {
        // let newProduct = new CartModel(newcartdata)
        // await newProduct.save()
        res.send({msg:"product added in cart"})
    } catch (err) {
        res.send({msg:"err while adding product in cart",error:err})
    }
})

cartRoutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    // let payload = req.body
    console.log(id)

    let payload = await AdminProductModel.find({product_item_meta__title:"watch"})
    // req.body = data[0]
    // let newcartdata = req.body
    console.log("ak")
    console.log((payload[0]._id))
        
    try {
        //  await CartModel.findByIdAndUpdate(id,payload)
        res.send({msg:"product Updated successfully"})
    } catch (err) {
        res.send({msg:"err while updating product in cart",error:err})
    }
})

cartRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
 
    try {
         await CartModel.findByIdAndDelete({_id:id})
        res.send({msg:"product Deleted from cart"})
    } catch (err) {
        res.send({msg:"err while Deleting product from cart",error:err})
    }
})


module.exports = {cartRoutes}