import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS} from "./product.types"

const initialState = {
    loading : false,
    error : false,
    data : [],
    product : {}
}

export const productReducer = (state=initialState,{type,payload})=>{
   switch(type){
    case GET_PRODUCTS_LOADING : return{
        ...state,
        loading : true,
        error : false
    };
    case GET_PRODUCTS_ERROR : return {
        ...state,
        loading : false,
        error : true
    };
    case GET_PRODUCTS_SUCCESS : return{
        ...state,
        loading : false,
        error : false,
        data : payload
    };
    case GET_EARBUD_PRODUCTS_SUCCESS : return {
        ...state,
        loading : false,
        error : false,
        data : payload
    }
    default:return state
   }
}