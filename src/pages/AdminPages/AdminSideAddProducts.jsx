import React, { useState } from 'react'


import {useDispatch,useSelector} from "react-redux"
import { addProduct } from '../../redux/adminReducer/action'

function AdminSideAddProducts() {

  const [val, setVal] = useState({})

  const dispatch = useDispatch((store)=>console.log(store))

  let handleChange = (e)=>{
    const {name,value} = e.target

    setVal({...val,[name]:value})
  }



  return (
    <div>
      <h1>Add Product</h1>
      <div>
        <input type="text" onChange={(e)=>{handleChange(e)}} name="product_item_meta__title" id="" placeholder="Enter Product Title" required /> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="product_item__primary_image" id="" placeholder="Image 1" required/> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="product_item__secondary_image" id="" placeholder="Image 2" /> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="category" id="" placeholder="Category" required/> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="price" id="" placeholder="Offer Price" required/> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="price2" id="" placeholder="Launch Price" required/> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="feature" id="" placeholder="Feature 1" required/> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="feature2" id="" placeholder="Feature 2" /> <br />
        <input type="text" onChange={(e)=>{handleChange(e)}} name="feature3" id="" placeholder="Feature 3" /> <br />
        <button onClick={()=>dispatch(addProduct(val))}>ADD</button>

      </div>
    </div>
  )
}

export default AdminSideAddProducts
