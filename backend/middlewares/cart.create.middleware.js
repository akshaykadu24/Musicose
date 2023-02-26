const { AdminProductModel } = require("../modules/admin.product.model")

const cartCreateMiddleware = async(req,res,next)=>{
    let id = req.params.id
    console.log(id)
    let data = await AdminProductModel.findById(id)
    console.log(data)
    let cData = {...req.body,
        product_item_meta__title:  data.product_item_meta__title,
        product_item__primary_image:  data.product_item__primary_image,
        product_item__secondary_image:  data.product_item__secondary_image,
        category:  data.category,
        price:  data.price,
        price2:  data.price2,
        feature:  data.feature,
        feature2:  data.feature2,
        feature3:  data.feature3,
        quantity:  1
    }
    req.body = cData

    try {
        
        next()
    } catch (err) {
        res.send({msg:"err in cart middleware"})
    }
}

module.exports = {cartCreateMiddleware}