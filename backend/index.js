const express = require("express")
const cors = require("cors")
const { database } = require("./configs/db")
const { userRoutes } = require("./routes/user.routes")
const {  adminProductRoutes } = require("./routes/admin.products.routes")
const { cartRoutes } = require("./routes/cart.routes")
const { productRoutes } = require("./routes/product.routes")
const {auth} = require("./middlewares/authentication.middleware")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    try {
        res.send("welcome to Backend of MUSICOSE")
    } catch (err) {
        res.send({msg:"err while welcome backend"})
    }
})

app.use("/user",userRoutes)
app.use("/products",productRoutes)
app.use(auth)
app.use("/adminProduct",adminProductRoutes)
app.use("/cart",cartRoutes)


app.listen(process.env.port,async()=>{
    try {   
        await database
        console.log("connected to database")
        console.log(`server is running on port http://localhost:${process.env.port}`)
    } catch (err) {
        
    }
})