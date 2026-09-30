const { AdminProductModel } = require("../modules/admin.product.model")

const cartCreateMiddleware = async(req,res,next)=>{
    let id = req.params.id
    let data = await AdminProductModel.findById(id)
    if(!data){
        return res.status(404).send({msg:"product not found"})
    }
    // Build the cart row only from trusted product data.
    // Do not copy req.body, because it contains the product's own _id.
    let cData = {
        user: req.body.user,
        productId: id,
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