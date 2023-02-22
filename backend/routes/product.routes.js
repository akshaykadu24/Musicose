const express = require("express")
const { AdminProductModel } = require("../modules/admin.product.model")

const productRoutes = express.Router()

productRoutes.get("/",async(req,res)=>{
    try {
        let products = await AdminProductModel.find()
        res.send({products:products})
    } catch (err) {
        res.send({msg:"error while getting admin data",error:err})
    }
})

module.exports = {productRoutes}