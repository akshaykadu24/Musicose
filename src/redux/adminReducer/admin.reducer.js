import { ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS } from "./admin.action.types";

const initialState = {
  products: [],
  users: [],
  productItem: [],
  userprofile: [],
  Loading: false,
  Error: false,
};

const adminReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        Loading: true,
        Error: false,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        Loading: false,
        Error: false,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        Loading: false,
        Error: true,
      };
    case ADD_PRODUCT_REQUEST:{
      return{
        ...state,
        Loading:true,
      }
    }
    case ADD_PRODUCT_SUCCESS:{
      return{
        ...state,
        Loading:false,
        products:payload
      }
    }
    case ADD_PRODUCT_FAILURE:{
      return{
        ...state,
        Loading:false,
        Error:true
      }
    }

    case GET_USERS_REQUEST:
      return {
        ...state,
        Loading: true,
        Error: false,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        Loading: false,
        Error: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        Loading: false,
        Error: true,
      };
    case GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productItem: payload,
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
      };
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userprofile: payload,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer 
