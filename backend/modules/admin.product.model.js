const  mongoose  = require("mongoose")

const adminProductSchema = mongoose.Schema({
        
        product_item_meta__title: {type:String},
        product_item__primary_image: {type:String},
        product_item__secondary_image: {type:String},
        category:{type:String},
        price: {type:String},
        price2: {type:String},
        feature: {type:String},
        feature2: {type:String},
        feature3: {type:String}
})


const AdminProductModel = mongoose.model("product",adminProductSchema)

module.exports = {AdminProductModel}
