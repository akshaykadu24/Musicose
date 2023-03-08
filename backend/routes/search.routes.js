const express = require("express")
const { AdminProductModel } = require("../modules/admin.product.model")


const searchRouter = express.Router()


searchRouter.get("/",async(req,res)=>{
    try {
        let a = req.query
        console.log(a.search)
        let data = await AdminProductModel.find({category:{ $regex:`${a.search}`,$options:"i" }})
        res.send({data:data})
    } catch (error) {

        console.log(err)
        res.send({error:err})
    }
})

module.exports = {searchRouter}