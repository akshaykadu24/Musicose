import * as types from "./actionTypes";

const initialState = {
  products: [],
  users: [],
  productItem: [],
  userprofile: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isLoading: false,
        isError: false,
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false,
        isError: false,
      };
    case types.GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
      };
    case types.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productItem: payload,
      };
    case types.GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
      };
    case types.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
      };
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userprofile: payload,
      };
    case types.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export { reducer };
