import axios from "axios";
import { useEffect } from "react";
import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./admin.action.types";




///////////////////////////////////////////  users  /////////////////////////////////////////////


const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });

  return(
    axios({
      url:`${MusicoseApi}/user`,
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.parse(localStorage.getItem("token"))

      }
    }).then((res=>{
      console.log(res.data)
      
      res.data.msg==undefined? console.log(res) :alert(res.data.msg)
      dispatch({type:GET_USERS_SUCCESS,payload:res.data})
    })).catch(err=>{
      dispatch({type:GET_USERS_FAILURE,payload:err})
      alert(err.data.msg)
    })
  )
};


const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
 return(
  axios({
    method:"DELETE",
    url:`${MusicoseApi}/user/delete/${id}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem('token'))
    }
  }).then(res=>{
    console.log(res)
    dispatch({type:DELETE_USER_SUCCESS,payload:res.data})
    res.data.msg==undefined? console.log(res) :alert(res.data.msg)
  }).catch(err=>{
    dispatch({type:DELETE_USER_FAILURE,payload:err})
    alert(err.data.msg)
  })
 )
};

//////////////////////////////////admin Products ////////////////////////////////////////


const getProducts = () => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  return( 
    axios({
      url:`${MusicoseApi}/adminProduct`,
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.parse(localStorage.getItem("token"))

      }
    })).then(res=>{
      console.log(res)
      let use = JSON.parse(localStorage.getItem("user"))
      console.log(use)
      let filt
      if(use=="63f62622ef17e26786936ac3"){
        filt = res.data.products.filter((el)=>el.user==use)
        
      }else{
        filt = res.data.products
      }
      console.log(filt)
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:filt })
      res.data.msg==undefined? console.log(res) :alert(res.data.msg)
      
    }).catch(err=>{
      console.log(err)
      dispatch({type:GET_PRODUCTS_FAILURE,payload:err})
      alert(err)
    })
};

const addProduct = (product) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  return( 
    axios({
      method:"POST",
      url:`${MusicoseApi}/adminProduct/create`,
      data:product,

      headers: {
        "Content-Type":"application/json",
        "Authorization": JSON.parse(localStorage.getItem("token")),

      },
    })
    .then((res) => {
      console.log(res)
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.msg });
      console.log("inside action file:", res);
      res.data.msg==undefined? console.log(res) :alert(res.data.msg)
    })
    .catch((err) => {
      dispatch({ type: ADD_PRODUCT_FAILURE, payload: err });
      alert(err.data.msg)
    }));
};

const updateProduct = (id, payload) => (dispatch) => {
  console.log(id,payload)
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  return (
    axios({
      method:"PATCH",
      url: `${MusicoseApi}/adminProduct/update/${id}`,
      data:payload,
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.parse(localStorage.getItem("token"))
      }
    }).then(res=>{
      console.log(res)
      res.data.msg==undefined? console.log(res) :alert(res.data.msg)
      dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:res})
    }).catch(err=>{
      dispatch({type:UPDATE_PRODUCT_FAILURE,payload:err})
      alert(err.data.msg)
    }))
}

const deleteProduct = (id) => (dispatch) => {
  console.log(id)
    dispatch({ type: DELETE_PRODUCT_REQUEST });
  return (
    axios({
      method:"DELETE",
      url: `${MusicoseApi}/adminProduct/delete/${id}`,
      headers:{
        "Content-Type":"application/json",
        "Authorization": JSON.parse(localStorage.getItem("token"))
      }
    }).then(res=>{
      console.log(res)
      dispatch({type:DELETE_PRODUCT_SUCCESS,payload:res})
      res.data.msg==undefined? console.log(res) :alert(res.data.msg)
    }).catch(err=>{
      dispatch({type:DELETE_PRODUCT_FAILURE,payload:err})
      alert(err.data.msg)
    }))
};




export {
  getProducts,
  getUsers,
  addProduct,
  deleteProduct,
  updateProduct,
  deleteUser,
};
