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
        feature3: {type:String},
        rating__stars: {type:String},
        rating__caption: {type:String},
        // Id of the admin who added the product (set by the auth middleware on create)
        user: {type:String},
        // Name of the admin who added the product (sent by the admin form)
        addedBy: {type:String}
},{
        // Adds createdAt (when the product was added) and updatedAt (last edit)
        timestamps: true
})


const AdminProductModel = mongoose.model("product",adminProductSchema)

module.exports = {AdminProductModel}
