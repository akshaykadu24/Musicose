import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS, SORT_projectorES, SORT_projectorESS, SORT_alphabet,GET_SINGLE_PRODUCT_SUCCESS} from "./product.types"
import axios from "axios"

export const getearbudproduct = (search,low,high,sort,popularity,alphabet,ascending, descending)=>async(dispatch)=>{
    dispatch({ type : GET_PRODUCTS_LOADING });

    try{
        let url = `https://crowded-plum-horse.cyclic.app/allProducts?q=${search}`;


        // if(low || high){
        //     url = `https://crowded-plum-horse.cyclic.app/earbuds?q=${search}&price_gte=${low}&price_lte=${high}`
        // }else{
        //     url = `https://crowded-plum-horse.cyclic.app/earbuds?q=${search}` 
        // }


        let res = await axios.get(url)
       // console.log(res.data)
        dispatch({ type : GET_PRODUCTS_SUCCESS , payload : res.data })

    }catch(error){
        dispatch({ type : GET_PRODUCTS_ERROR })
    }
}



export const sortMydata = (how) => (dispatch) => {
    dispatch({ type: SORT_projectorES, payload: how });
  };


  export const sortMydatas = (ho) => (dispatch) => {
    dispatch({ type: SORT_alphabet, payload: ho });
  };



  export const getSingleData = (id) => async(dispatch)=>{
    dispatch({ type : GET_PRODUCTS_LOADING });
    try{
        let res = await axios.get(`https://crowded-plum-horse.cyclic.app/allProducts/${id}`)
        console.log(res.data)
        dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:res.data})

    }catch(error){
       dispatch({type:GET_PRODUCTS_ERROR,payload:error})
    }
  }