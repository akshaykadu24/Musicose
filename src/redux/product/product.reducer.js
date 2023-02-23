import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS,GET_FILTERED_PRODUCTS, SORT_projectorES, SORT_projectorESS, SORT_alphabet} from "./product.types"

const initialState = {
    loading : false,
    error : false,
    data : [],
    product : {},
    filteredBrandData:[]
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
break
      case SORT_alphabet: {
        if (payload == "z") {
          let sorted = state.data.sort(
            (a, b) => (a.title) - (b.title)
          );
  
          return { ...state, data: [...sorted] };
        } else if (payload == "a") {
          let sorted = state.data.sort(
            (a, b) => b.title - a.title
          );
          return { ...state, data: [...sorted] };
        }
      }
    default:return state
   }
}