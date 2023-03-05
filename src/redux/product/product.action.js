import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_LOADING,GET_PRODUCTS_ERROR,GET_EARBUD_PRODUCTS_SUCCESS, SORT_projectorES, SORT_projectorESS,GET_SINGLE_PRODUCT_SUCCESS, SORT_BY_ALPHABET} from "./product.types"
import axios from "axios"

export const getearbudproduct = (search,low,high,sort)=>async(dispatch)=>{
    dispatch({ type : GET_PRODUCTS_LOADING });
    let filt
    try{
        let url = `hhttps://blue-crocodile-robe.cyclic.app/products`;
        let res = await axios.get(url)
        console.log(res.data.products)
        console.log("filtering")
        filt = res.data.products.filter((el)=> el.category=="earbud")
        
        dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products : filt} })

    }catch(err){
      console.log(err,"error")
        dispatch({ type : GET_PRODUCTS_ERROR })
    }
}

export const getspeakerproduct = (search,low,high,sort)=>async(dispatch)=>{
  dispatch({ type : GET_PRODUCTS_LOADING });

  try{
      let url = `hhttps://blue-crocodile-robe.cyclic.app/products`;
      let res = await axios.get(url)
     //console.log(res.data)
     let filt = res.data.products.filter((el)=> el.category == "speaker")
      dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products : filt} })

  }catch(error){
      dispatch({ type : GET_PRODUCTS_ERROR })
  }
}



export const getheadphoneproduct = (search,low,high,sort)=>async(dispatch)=>{
  dispatch({ type : GET_PRODUCTS_LOADING });

  try{
      let url = `hhttps://blue-crocodile-robe.cyclic.app/products`;
      let res = await axios.get(url)
     //console.log(res.data)
     let filt = res.data.products.filter((el)=> el.category == "headphone")
      dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products : filt} })

  }catch(error){
      dispatch({ type : GET_PRODUCTS_ERROR })
  }
}


export const getbluetoothheadphoneproduct = (search,low,high,sort)=>async(dispatch)=>{
  dispatch({ type : GET_PRODUCTS_LOADING });

  try{
      let url = `hhttps://blue-crocodile-robe.cyclic.app/products`;
      let res = await axios.get(url)
     //console.log(res.data)
     let filt = res.data.products.filter((el)=> el.category == "bluetoothHeadphone")
      dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products : filt}})

  }catch(error){
      dispatch({ type : GET_PRODUCTS_ERROR })
  }
}



export const getwatchproduct = (search,low,high,sort)=>async(dispatch)=>{
  dispatch({ type : GET_PRODUCTS_LOADING });

  try{
      let url = `hhttps://blue-crocodile-robe.cyclic.app/products`;
      let res = await axios.get(url)
     //console.log(res.data)
     let filt = res.data.products.filter((el)=> el.category == "watch")
      dispatch({ type : GET_PRODUCTS_SUCCESS , payload : {products : filt} })

  }catch(error){
      dispatch({ type : GET_PRODUCTS_ERROR })
  }
}



export const sortMydata = (how,category) => (dispatch) => {
    dispatch({ type: SORT_projectorES, payload: {how:how,category:category} });
  };

  export const handleSortAlpha = (alpha,category) => (dispatch)=>{
    dispatch({type:SORT_BY_ALPHABET,payload:{alpha:alpha, category:category}})
  }

  // export const sortMydatas = (ho) => (dispatch) => {
  //   dispatch({ type: SORT_alphabet, payload: ho });
  // };



  export const getSingleData = (id) => async(dispatch)=>{
    console.log(id)
    dispatch({ type : GET_PRODUCTS_LOADING });
    try{
         let res = await axios.get(`hhttps://blue-crocodile-robe.cyclic.app/products`,{
           headers : {
             "Authorization" : JSON.parse(localStorage.getItem("token"))
           }
         })
         console.log(res)
         let filt = res.data.products.filter((el)=> el._id == id )
        
      console.log(filt)
      
      //console.log(res)

        dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:filt[0]})
     
    }catch(error){
      console.log(error)
       dispatch({type:GET_PRODUCTS_ERROR,payload:error})
    }
  }



  

