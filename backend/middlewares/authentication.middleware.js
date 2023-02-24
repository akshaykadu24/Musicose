const jwt = require("jsonwebtoken");


const auth = (req,res,next)=>{
    
    let token = req.headers.authorization
    console.log(token,"auth")
    if(token){
        
            jwt.verify(token,"shhhh",(err,decoded)=>{
                console.log(decoded,"decoded")
                if(err){
                    res.send({msg:"invalid token"})
                }else{
                    req.body.user = decoded.userID
                        next()
                }
            })
           

    }else{
        res.send({msg:"token is missing"})
    }
}

module.exports = {auth}