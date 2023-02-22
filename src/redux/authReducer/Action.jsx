import axios from 'axios'
import * as types from './ActionTypes'

export const postLoginRequest = () => {
    return {
        type: types.USER_LOGIN_REQUEST
    }
}

export const postLoginSuccess = (data) => {
    return {
        type: types.USER_LOGIN_SUCCESS,
        payload:data
    }
}

export const postLoginFailure = () => {
    return {
        type: types.USER_LOGIN_FAILURE
    }
}

export const login = (payload) => (dispatch) => {
    dispatch(postLoginRequest())

     axios.post(`https://rich-red-indri-tie.cyclic.app/users/login`,payload)
        .then((res) => {
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("adminkey",res.data.adminID)
            localStorage.setItem("userkey",res.data.userKey)
    console.log(res.data)
            dispatch(postLoginSuccess(res.data.token))
        })
        .catch((e) => {
            dispatch(postLoginFailure())
        })
}

export const signup = (payload) => (dispatch) => {
    dispatch(postLoginRequest())

     axios.post(`https://rich-red-indri-tie.cyclic.app/users/user/signup`,payload)
        .then((res) => {
            // localStorage.setItem("token",res.data.token)
    console.log(res.data)
            // dispatch(postLoginSuccess(res.data.token))
        })
        .catch((e) => {
            dispatch(postLoginFailure())
        })
}
export const logOutUser =(payload)=>{
return {
    type:types.USER_LOGOUT,payload: payload
}
}