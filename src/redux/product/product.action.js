import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS} from "./product.types"
import axios from "axios"

export const getearbudproduct = ()=>async(dispatch)=>{
    dispatch({ type : GET_PRODUCTS_LOADING });

    try{
        let url = `https://crowded-plum-horse.cyclic.app/earbuds`;
        let res = await axios.get(url)
       // console.log(res.data)
        dispatch({ type : GET_PRODUCTS_SUCCESS , payload : res.data })

    }catch(error){
        dispatch({ type : GET_PRODUCTS_ERROR })
    }
}
