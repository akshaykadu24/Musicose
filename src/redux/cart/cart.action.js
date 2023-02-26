import axios from "axios"
import { ADD_TO_CART, CART_ERROR, CART_LOADING, GET_CART, REMOVE_FROM_CART, UPDATE_TO_CART } from "./cart.types"



export const addCart = (item)=>async(dispatch)=>{
    console.log(item)
   dispatch({type:CART_LOADING})
   
    axios({
        method:"POST",
        url:`http://localhost:8080/cart/create/${item._id}`,
        data:item,
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : JSON.parse(localStorage.getItem("token"))
         },
    }).then((res)=>{
        console.log(res)
        dispatch({type:ADD_TO_CART,payload:res.data})
    }).catch(err=>{
        console.log(err)
        dispatch({type:CART_ERROR})
    })
    
   
   
}

export const getCartItems = ()=>async(dispatch)=>{
    dispatch({type:CART_LOADING})
    try{
        let res = await axios.get("http://localhost:8080/cart",{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : JSON.parse(localStorage.getItem("token"))
             },
        })
        
        //console.log(res.data)
        dispatch({type:GET_CART,payload:res.data})
    }catch(error){
        dispatch({type:CART_ERROR})
    }
}

export const deleteCart = (id)=>async(dispatch)=>{
    console.log(id)
    dispatch({type:CART_LOADING})
    try{
        let res = await axios.delete(`http://localhost:8080/cart/delete/${id}`,{
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : JSON.parse(localStorage.getItem("token"))
             },
        })
        console.log(res)
        dispatch({type:REMOVE_FROM_CART,payload:res.msg})
    }catch(error){
        dispatch({type:CART_ERROR})
    }
}


export const updateCart = (id,quantity)=>async(dispatch)=>{
    console.log(id)
    dispatch({type:CART_LOADING})
    // try{
    //     let res = await axios.patch(`http://localhost:8080/cart/update/${id}`,{
    //         headers:{
    //             "Content-Type" : "application/json",
    //             "Authorization" : JSON.parse(localStorage.getItem("token"))
    //          },
    //     });
    //     console.log(res)
    //     dispatch({type:UPDATE_TO_CART,payload:res.body})
    // }catch(error){
    //     dispatch({type:CART_ERROR})
    // }


    axios({
        method:"PATCH",
        url:`http://localhost:8080/cart/update/${id}`,
        data:JSON.stringify({quantity:quantity}),
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : JSON.parse(localStorage.getItem("token"))
         },
    }).then((res)=>{
        console.log(res)
        dispatch({type:ADD_TO_CART,payload:res.data})
    }).catch(err=>{
        console.log(err)
        dispatch({type:CART_ERROR})
    })
}