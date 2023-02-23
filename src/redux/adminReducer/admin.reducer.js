import { ADD_PRODUCT_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCT_BY_ID_FAILURE, GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS } from "./action.types";

const initialState = {
  products: [],
  users: [],
  productItem: [],
  userprofile: [],
  isLoading: false,
  isError: false,
};

const adminReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isLoading: false,
        isError: false,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case ADD_PRODUCT_SUCCESS:{
      return{
        ...state,
        isLoading:false,
        products:payload
      }
    }

    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false,
        isError: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
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
