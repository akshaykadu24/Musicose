const  mongoose  = require("mongoose")

const cartSchema = mongoose.Schema({
        
        product_item_meta__title: {type:String},
        product_item__primary_image: {type:String},
        product_item__secondary_image: {type:String},
        category:{type:String},
        price: {type:String},
        price2: {type:String},
        feature: {type:String},
        feature2: {type:String},
        feature3: {type:String},
        quantity:{type:Number},
        user:{type:String}
})


const CartModel = mongoose.model("cart",cartSchema)

module.exports = {CartModel}

// {
//     "product_item_meta__title": "watch",
//     "product_item__primary_image":"https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main1_0ae2597d-dee4-42fd-9a18-eb4ae0b3bc43_600x.png?v=1647765304" ,
//     "product_item__secondary_image":"https://cdn.shopify.com/s/files/1/0057/8938/4802/products/WavePro-FI-Black02_900x.png?v=1675366744" ,
//     "caterogy":"watch",
//     "price": 2999,
//     "price2": 5999,
//     "feature": "amoled",
//     "feature2": "waterProof",
//     "feature3":"Bluetooth calling"


// }
