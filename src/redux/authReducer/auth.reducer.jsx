import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "./auth.actionTypes"


const initialState = {
    isAuth: false,
    token: '',
    isAuthLoading: false,
    isAuthError: false
}


export const authReducer = (state = initialState, { type, payload }) => {
    

    switch (type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state, 
                isAuthLoading: true
            }
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthLoading: false, 
                isAuth:true, 
                token: payload
            }
        }
        case USER_LOGIN_FAILURE: {
            return {
                ...state, 
                isAuthLoading: false, 
                isAuthError: true
            }
        }
        case USER_LOGOUT:{
            return {
                    isAuth: false,
                    token: undefined,
                    isAuthLoading: false,
                    isAuthError: false
                
            }
        }
        default: return state
    }
}

