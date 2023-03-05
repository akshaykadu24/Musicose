import { Box, Heading, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct, getProducts } from '../../redux/adminReducer/admin.action'
import UpdateProduct from './updateProduct'

const AdminMapProductBox = ({el}) => {
    const dispatch = useDispatch()
    const handleDelete = (id)=>{
      dispatch(deleteProduct(el._id))
      dispatch(getProducts())
      el.setCount((prev)=>prev+1)
    }
    useEffect(()=>{
      
    },[])
  return (
    <Tr key={el._id} width={"100%"} boxShadow="outline">
                
            <Td><Image width={["100px", "100px", "150px", "200px"]} src={el.product_item__primary_image}></Image></Td>
        
        
            <Td><Text  width={"200px"} fontSize={["xl","xl"]}>{el.product_item_meta__title}</Text></Td>
        
        
            <Td><Text  width={"50px"} fontSize={["xl","xl"]}>{el.price}</Text></Td>
        
        
            <Td><Text  width={"70px"} fontSize={["xl","xl"]}>{el.price2}</Text></Td>
        
        
            <Td><Text  width={"90px"} fontSize={["xl","xl"]}>{el.category}</Text></Td>
        
        
            <Td><Text  width={"90px"} fontSize={["xl","xl"]}>{el.feature}</Text></Td>
            
            <Td>  <UpdateProduct  el={el}/></Td>
            <Td><Text backgroundColor={"red"} color={"white"} textAlign={"center"} padding={"5px"} borderRadius={"8%"} fontWeight={"medium"} onClick={()=>handleDelete(el._id)} fontSize={["xl","2xl"]}>Delete</Text></Td>
        
    </Tr>
  )
}

export default AdminMapProductBox