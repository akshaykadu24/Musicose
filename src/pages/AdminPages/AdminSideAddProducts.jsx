

import { Box, Button, Heading, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'


import {useDispatch} from "react-redux"
import { addProduct } from '../../redux/adminReducer/admin.action'

function AdminSideAddProducts() {

  const [val, setVal] = useState({})

  const dispatch = useDispatch()
  let handleChange = (e)=>{
    const {name,value} = e.target

    setVal({...val,[name]:value})
  }
  // console.log(val)
  
  const handleSubmit =()=>{
    dispatch(addProduct(val))
    document.getElementById("product_item_meta__title").value = ""
    document.getElementById("product_item__primary_image").value = ""
    document.getElementById("product_item__secondary_image").value = ""
    document.getElementById("category").value = ""
    document.getElementById("price").value = ""
    document.getElementById("price2").value = ""
    document.getElementById("feature").value = ""
    document.getElementById("feature2").value = ""
    document.getElementById("feature3").value = ""
    alert("Product is added")
  }



  return (
    <div>
    <Box backgroundColor={"teal"} width={"50%"} margin={"auto"} paddingBottom={"10px"} borderRadius="5%">
      <Heading color={"white"} marginBottom={"10px"}>Add Product</Heading>
      <Box width={"80%"} margin={"auto"} backgroundColor={"white"} padding={"10px"} borderRadius="5%">
        <Input type="text"  onChange={(e)=>{handleChange(e)}} margin="7px" name="product_item_meta__title" id="product_item_meta__title" placeholder="Enter Product Title" required /> <br />
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="product_item__primary_image" id="product_item__primary_image" placeholder="Image 1" required/> <br />
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="product_item__secondary_image" id="product_item__secondary_image" placeholder="Image 2" /> <br />
        <Select name="category"  onChange={(e)=>{handleChange(e)}} margin="7px" id="category" placeholder='Select Category' >
          <option value='watch'>Watch </option>
          <option value='earbud'>Earbuds</option>
          <option value='headphone'>Headphone</option>
          <option value='speaker'>Speaker</option>
          <option value='bluetoothHeadphone'>Bluetooth Headphone</option>

        
        </Select>
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="price" id="price" placeholder="Offer Price" required/> <br />
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="price2" id="price2" placeholder="Launch Price" required/> <br />
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="feature" id="feature" placeholder="Feature 1" required/> <br />
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="feature2" id="feature2" placeholder="Feature 2" /> <br />
        <Input type="text" onChange={(e)=>{handleChange(e)}} margin="7px" name="feature3" id="feature3" placeholder="Feature 3" /> <br />
        <Button  backgroundColor={"skyblue"}  width={"50%"} onClick={handleSubmit}>ADD</Button>

      </Box>
    </Box>
    </div>
  )
}

export  {AdminSideAddProducts}