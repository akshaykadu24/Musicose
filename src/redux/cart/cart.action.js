import axios from "axios"
import { ADD_TO_CART, CART_ERROR, CART_LOADING, GET_CART } from "./cart.types"



export const addCart = (item)=>async(dispatch)=>{
   dispatch({type:CART_LOADING})
   try{
    let res = await axios.post("https://crowded-plum-horse.cyclic.app/cart",item);
    console.log(res.data)
    dispatch({type:ADD_TO_CART,payload:res.data})
   }catch(error){
     dispatch({type:CART_ERROR})
   }
}

export const getCartItems = ()=>async(dispatch)=>{
    dispatch({type:CART_LOADING})
    try{
        let res = await axios.get("https://crowded-plum-horse.cyclic.app/cart")
        console.log(res.data)
        dispatch({type:GET_CART,payload:res.data})
    }catch(error){
        dispatch({type:CART_ERROR})
    }
}

export const deleteCart = (id)=>async(dispatch)=>{
    dispatch({type:CART_LOADING})
}