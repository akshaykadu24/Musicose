import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS,GET_FILTERED_PRODUCTS, SORT_projectorES, SORT_projectorESS, SORT_alphabet, GET_SINGLE_PRODUCT_SUCCESS, SORT_BY_ALPHABET} from "./product.types"

const initialState = {
    loading : false,
    error : false,
    data : [],
    product : {},
    filteredBrandData:[],
    singleData:[]
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
    case SORT_projectorES: {
        if (payload == "high") {
          let sorted = state.data.sort(
            (a, b) => Number(a.price) - Number(b.price)
          );
  
          return { ...state, data: [...sorted] };
        } else if (payload == "low") {
          let sorted = state.data.sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
          return { ...state, data: [...sorted] };
        }
      };


      case SORT_BY_ALPHABET:{
        if(payload =="z"){
          let sortedData = state.data.sort((a,b)=>
             a.title < b.title ? 1 : a.title > b.title ? -1 : 0
          )
          return { ...state, data: [...sortedData]}
        }
         else if(payload == "a"){
          let sortedData = state.data.sort((a,b)=>
          a.title < b.title ? -1 : a.title > b.title ? 1 : 0
       )
       return { ...state, data: [...sortedData]}
         }
      }

      

      case GET_SINGLE_PRODUCT_SUCCESS : return  {
            ...state,
            loading : false,
            product :payload
      }
    default:return state
   }
}