const { AdminProductModel } = require("../modules/admin.product.model")

const cartMiddleware = async(req,res,next)=>{
    let id = req.params.id
    console.log(id)
    let data = await AdminProductModel.find({product_item_meta__title:"watch"})
    // console.log(data)
    req.body = data[0]
    console.log(req.body,"lllllllll")
    try {
        // req.body = data[0]
        // let newcartdata = req.body
   
        // res.send({msg:" middleware"})

        next()
    } catch (err) {
        res.send({msg:"err in cart middleware"})
    }
}

module.exports = {cartMiddleware}