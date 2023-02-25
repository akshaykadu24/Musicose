import axios from "axios"
import { ADD_TO_CART, CART_ERROR, CART_LOADING, GET_CART, REMOVE_FROM_CART, UPDATE_TO_CART } from "./cart.types"



export const addCart = (item)=>async(dispatch)=>{
   dispatch({type:CART_LOADING})
   try{
    let res = await axios.post("https://crowded-plum-horse.cyclic.app/cart",item);
    //console.log(res.data)
    dispatch({type:ADD_TO_CART,payload:res.data})
   }catch(error){
     dispatch({type:CART_ERROR})
   }
}

export const getCartItems = ()=>async(dispatch)=>{
    dispatch({type:CART_LOADING})
    try{
        let res = await axios.get("https://crowded-plum-horse.cyclic.app/cart")
        //console.log(res.data)
        dispatch({type:GET_CART,payload:res.data})
    }catch(error){
        dispatch({type:CART_ERROR})
    }
}

export const deleteCart = (id)=>async(dispatch)=>{
    dispatch({type:CART_LOADING})
    try{
        let res = await axios.delete(`https://crowded-plum-horse.cyclic.app/cart/${id}`)
        dispatch({type:REMOVE_FROM_CART,payload:id})
    }catch(error){
        dispatch({type:CART_ERROR})
    }
}


export const updateCart = (id,changes)=>async(dispatch)=>{
    dispatch({type:CART_LOADING})
    try{
        let res = await axios.patch(`https://crowded-plum-horse.cyclic.app/cart/${id}`,{
            ...changes
        });
        dispatch({type:UPDATE_TO_CART,payload:res.data})
    }catch(error){
        dispatch({type:CART_ERROR})
    }
}