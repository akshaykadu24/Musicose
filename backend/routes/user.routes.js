const express = require("express")
const { UserModel } = require("../modules/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { auth } = require("../middlewares/authentication.middleware")

const userRoutes = express.Router()



userRoutes.post("/register",async(req,res)=>{
    let {name,email,type,pass} = req.body
    let olduser = await UserModel.find({email})
    if(olduser.length>0){
        res.send({msg:"User is already registered please login"})
    }else{
        try {
            bcrypt.hash(pass,5,async(err,hash)=>{
                if(err){
                    res.send({msg:"User Registation failed"})
                }else{

                    let user = UserModel({name,email,type,pass:hash})
                    await user.save()
                    res.send({msg:"User is Registered"})
                }
            })
        } catch (err) {
            res.send({msg:"error with Registering User"})
        }
    }

})

userRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
    await UserModel.findByIdAndDelete(id)
    res.send("Product is deleted from database")
})

userRoutes.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    let user = await UserModel.find({email})
    console.log(user)
    try {
        if(user.length>0){

            let passDecript = await bcrypt.compare(pass,user[0].pass)
            console.log(passDecript)
            if(passDecript){
                let token = jwt.sign({userID:user[0]._id},"shhhh")
                if(token){
                    res.send({msg:"Login successfully",token:token,user:user[0]._id,type:user[0].type,name:user[0].name})
                }else{
                    res.send({msg:"token is missing"})
                }
    
            }else{
                res.send({msg:"Wrong Password"})
            }
        }else{
            res.send({msg:"User is not registered Please Signup First"})
        }
        
    } catch (err) {
        res.send("error while Login")
    }
})
userRoutes.use("/",auth)
userRoutes.get("/",async(req,res)=>{

    let data = await UserModel.find()
    res.send(data)
})
module.exports = {userRoutes}