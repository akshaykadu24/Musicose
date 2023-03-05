import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS,GET_FILTERED_PRODUCTS, SORT_projectorES, SORT_projectorESS, SORT_alphabet, GET_SINGLE_PRODUCT_SUCCESS, SORT_BY_ALPHABET, GET_SPEAKER_PRODUCTS_SUCCESS, GET_BLUETOOTH_HEADPHONE_PRODUCTS_SUCCESS, GET_HEADPHONE_PRODUCTS_SUCCESS, GET_WATCH_PRODUCTS_SUCCESS} from "./product.types"

const initialState = {
    loading : false,
    error : false,
    data : [],
    earbuds:[],
    watch:[],
    bluetooth_headphone:[],
    headphone:[],
    speaker:[],
    product : {},
    filteredBrandData:[],
    singleData:[]
}

export const productReducer = (state=initialState,{type,payload})=>{
  console.log(payload)
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
        earbuds : payload
    };
    case GET_EARBUD_PRODUCTS_SUCCESS : return {
        ...state,
        loading : false,
        error : false,
        earbuds : payload
    };
    case GET_SPEAKER_PRODUCTS_SUCCESS : return {
      ...state,
      loading : false,
      error : false,
      speaker : payload
  };
  case GET_BLUETOOTH_HEADPHONE_PRODUCTS_SUCCESS : return {
    ...state,
    loading : false,
    error : false,
    bluetooth_headphone : payload
};
case GET_HEADPHONE_PRODUCTS_SUCCESS : return {
  ...state,
  loading : false,
  error : false,
  headphone : payload
};
case GET_WATCH_PRODUCTS_SUCCESS : return {
  ...state,
  loading : false,
  error : false,
  watch : payload
};

    case SORT_projectorES: {
      let data2 = []
      data2 = payload.category=="earbud"?  state.earbuds :payload.category=="watch"?  state.watch :payload.category=="speaker"?  state.speaker :payload.category=="bluetoothHeadphone"?  state.bluetooth_headphone :payload.category=="headphone"?  state.headphone :[]
      let sorted
        if (payload.how == "high") {
          sorted = data2.products.sort(
            (a, b) => Number(a.price) - Number(b.price)
          );
          // return { ...state, data: [...sorted] };
        } 
        else if (payload.how == "low") {
          sorted = data2.products.sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
          // return { ...state, data: [...sorted] };
        }
      };



      case SORT_BY_ALPHABET:{
        let data2 = []
        let sortedData
        data2 = payload.category=="earbud"?  state.earbuds :payload.category=="watch"?  state.watch :payload.category=="speaker"?  state.speaker :payload.category=="bluetoothHeadphone"?  state.bluetooth_headphone :payload.category=="headphone"?  state.headphone :[]
        if(payload.alpha =="z"){
          sortedData = data2.products.sort(
            (a,b)=> a.product_item_meta__title < b.product_item_meta__title ? 1 : a.product_item_meta__title > b.product_item_meta__title ? -1 : 0
          )
          // return { ...state, data: [...sortedData]}
        }
         else if(payload.alpha == "a"){
          sortedData = data2.products.sort(
            (a,b)=> a.product_item_meta__title < b.product_item_meta__title ? -1 : a.product_item_meta__title > b.product_item_meta__title ? 1 : 0
       )
      //  return { ...state, data: [...sortedData]}
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