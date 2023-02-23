const express = require("express")
const { AdminProductModel } = require("../modules/admin.product.model")

const adminProductRoutes = express.Router()

adminProductRoutes.get("/",async(req,res)=>{
    try {
        console.log(req.body)
        let products = await AdminProductModel.find()
        res.send({products:products})
    } catch (err) {
        res.send({msg:"error while getting admin data",error:err})
    }
})

adminProductRoutes.post("/create",async(req,res)=>{
    let data = req.body

    try {
        let newProduct = new AdminProductModel(data)
        await newProduct.save()
    
        res.send({msg:"product added successfully"})
    } catch (err) {
        res.send({msg:"err while adding product in admin",error:err})
    }
})

adminProductRoutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    console.log(id)
    try {
         await AdminProductModel.findByIdAndUpdate(id,payload)
        res.send({msg:"product Updated successfully"})
    } catch (err) {
        res.send({msg:"err while updating product in admin",error:err})
    }
})

adminProductRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
 
    try {
         await AdminProductModel.findByIdAndDelete({_id:id})
        res.send({msg:"product Deleted successfully"})
    } catch (err) {
        res.send({msg:"err while Deleting product in admin",error:err})
    }
})


module.exports = {adminProductRoutes}