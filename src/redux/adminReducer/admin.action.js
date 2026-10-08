import axios from "axios";
import { useEffect } from "react";
import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./admin.action.types";




///////////////////////////////////////////  users  /////////////////////////////////////////////


const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  return axios({
    url:`${process.env.REACT_APP_MUSICOSE_API}/user`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem("token"))
    }
  }).then(res=>{
    // A list means success; otherwise the API sends { msg } (e.g. "invalid token")
    if(!Array.isArray(res.data)){
      dispatch({type:GET_USERS_FAILURE,payload:res.data?.msg})
      return
    }
    dispatch({type:GET_USERS_SUCCESS,payload:res.data})
  }).catch(err=>{
    dispatch({type:GET_USERS_FAILURE,payload:err})
  })
};

// Resolves to { ok, msg } so the users page can show a toast
const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  return axios({
    method:"DELETE",
    url:`${process.env.REACT_APP_MUSICOSE_API}/user/delete/${id}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem('token'))
    }
  }).then(res=>{
    dispatch({type:DELETE_USER_SUCCESS,payload:res.data})
    return { ok: true }
  }).catch(err=>{
    dispatch({type:DELETE_USER_FAILURE,payload:err})
    return { ok: false, msg: err?.response?.data?.msg || "Could not delete the user" }
  })
};

//////////////////////////////////admin Products ////////////////////////////////////////


const getProducts = () => (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  return axios({
    url:`${process.env.REACT_APP_MUSICOSE_API}/adminProduct`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem("token"))
    }
  }).then(res=>{
    // The API only sends a msg when the request failed
    if(!res.data.products){
      dispatch({type:GET_PRODUCTS_FAILURE,payload:res.data.msg})
      return
    }
    let use = JSON.parse(localStorage.getItem("user"))
    let filt
    if(use=="63f62622ef17e26786936ac3"){
      filt = res.data.products.filter((el)=>el.user==use)
    }else{
      filt = res.data.products
    }
    dispatch({type:GET_PRODUCTS_SUCCESS,payload:filt })
  }).catch(err=>{
    dispatch({type:GET_PRODUCTS_FAILURE,payload:err})
  })
};

const addProduct = (product) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  return axios({
    method:"POST",
    url:`${process.env.REACT_APP_MUSICOSE_API}/adminProduct/create`,
    data:product,
    headers: {
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem("token")),
    },
  }).then((res) => {
    const ok = !res.data.error
    dispatch({ type: ok ? ADD_PRODUCT_SUCCESS : ADD_PRODUCT_FAILURE });
    return { ok, msg: res.data.msg }
  }).catch((err) => {
    dispatch({ type: ADD_PRODUCT_FAILURE, payload: err });
    return { ok: false, msg: err?.response?.data?.msg || "Could not add the product" }
  });
};

// Update and delete resolve to { ok, msg } so the admin page can show a toast
const updateProduct = (id, payload) => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  return axios({
    method:"PATCH",
    url: `${process.env.REACT_APP_MUSICOSE_API}/adminProduct/update/${id}`,
    data:payload,
    headers:{
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem("token"))
    }
  }).then(res=>{
    const ok = !res.data.error
    dispatch({type: ok ? UPDATE_PRODUCT_SUCCESS : UPDATE_PRODUCT_FAILURE, payload:res})
    return { ok, msg: res.data.msg }
  }).catch(err=>{
    dispatch({type:UPDATE_PRODUCT_FAILURE,payload:err})
    return { ok: false, msg: err?.response?.data?.msg || "Could not update the product" }
  })
}

const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  return axios({
    method:"DELETE",
    url: `${process.env.REACT_APP_MUSICOSE_API}/adminProduct/delete/${id}`,
    headers:{
      "Content-Type":"application/json",
      "Authorization": JSON.parse(localStorage.getItem("token"))
    }
  }).then(res=>{
    const ok = !res.data.error
    dispatch({type: ok ? DELETE_PRODUCT_SUCCESS : DELETE_PRODUCT_FAILURE, payload:res})
    return { ok, msg: res.data.msg }
  }).catch(err=>{
    dispatch({type:DELETE_PRODUCT_FAILURE,payload:err})
    return { ok: false, msg: err?.response?.data?.msg || "Could not delete the product" }
  })
};




export {
  getProducts,
  getUsers,
  addProduct,
  deleteProduct,
  updateProduct,
  deleteUser,
};
