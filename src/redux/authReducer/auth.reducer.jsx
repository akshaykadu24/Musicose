
import * as types from './ActionTypes'

const initialState = {
    isAuth: false,
    token: '',
    isAuthLoading: false,
    isAuthError: false
}


export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOGIN_REQUEST: {
            return {
                ...state, isAuthLoading: true
            }
        }
        case types.USER_LOGIN_SUCCESS: {
            return {
                ...state, isAuthLoading: false, isAuth:true, token: payload
            }
        }
        case types.USER_LOGIN_FAILURE: {
            return {
                ...state, isAuthLoading: false, isAuthError: true
            }
        }
        case types.USER_LOGOUT:{
            return {
                    isAuth: false,
                    token: payload,
                    isAuthLoading: false,
                    isAuthError: false
                
            }
        }
        default: return state
    }
}

