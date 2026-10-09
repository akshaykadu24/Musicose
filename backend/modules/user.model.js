
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    type:{type:String},
    pass:{type:String}
},{
    // Adds createdAt (sign-up time) and updatedAt
    timestamps: true
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}