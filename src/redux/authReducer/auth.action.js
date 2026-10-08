import axios from 'axios'
import {
    HIDE_AUTH_POPUP,
    SHOW_AUTH_POPUP,
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_FAILURE,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
} from './auth.actionTypes'

const getErrorMessage = (err, fallback) =>
    err?.response?.data?.msg || fallback

export const showAuthPopup = (payload) => ({ type: SHOW_AUTH_POPUP, payload })
export const hideAuthPopup = () => ({ type: HIDE_AUTH_POPUP })

// Resolves to { ok, msg } so the calling form can show errors inline.
export const loginAction = (payload) => (dispatch) => {
    dispatch({type:USER_LOGIN_REQUEST})
    return axios({
        method:"POST",
        url:`${process.env.REACT_APP_MUSICOSE_API}/user/login`,
        data: payload,
        headers:{
            "Authorization":JSON.parse(localStorage.getItem("token")),
            "Content-Type":"application/json"
        }
    }).then(res=>{
        const { token, user, type, name, msg } = res.data
        if(token){
            localStorage.setItem("token",JSON.stringify(token))
            localStorage.setItem("user",JSON.stringify(user))
            localStorage.setItem("type",JSON.stringify(type))
            localStorage.setItem("name",JSON.stringify(name))
        }
        dispatch({type:USER_LOGIN_SUCCESS,payload:res.data})

        if(!token){
            return { ok: false, msg: msg || "Login failed. Please try again." }
        }

        const firstName = (name || "").trim().split(" ")[0]
        dispatch(showAuthPopup({
            title: firstName ? `Welcome back, ${firstName}!` : "Welcome back!",
            message: "You're logged in. Your cart, orders and favourites are ready.",
            actionLabel: "Start exploring",
        }))
        return { ok: true, msg }
    }).catch(err=>{
        dispatch({type:USER_LOGIN_FAILURE})
        return { ok: false, msg: getErrorMessage(err, "Unable to reach the server. Please try again.") }
    })
}

// The API answers 200 for every outcome, so success is identified by its message.
export const signupAction = (payload) => (dispatch) => {
    dispatch({type:USER_SIGNUP_REQUEST})
    return axios({
        method:"POST",
        url:`${process.env.REACT_APP_MUSICOSE_API}/user/register`,
        data: payload,
        headers:{
            "Content-Type":"application/json",
        }
    }).then(res=>{
        const msg = res.data?.msg
        if(msg === "User is Registered"){
            dispatch({type:USER_SIGNUP_SUCCESS,payload:res})
            return { ok: true, msg }
        }
        dispatch({type:USER_SIGNUP_FAILURE})
        return { ok: false, msg: msg || "Registration failed. Please try again." }
    }).catch(err=>{
        dispatch({type:USER_SIGNUP_FAILURE})
        return { ok: false, msg: getErrorMessage(err, "Unable to reach the server. Please try again.") }
    })
}

export const logoutAction = (dispatch)=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("type")
    localStorage.removeItem("name")

    dispatch({type:USER_LOGOUT})
    return dispatch(showAuthPopup({
        variant: "info",
        title: "You've been logged out",
        message: "Thanks for visiting Musicose. See you again soon!",
        actionLabel: "Continue",
    }))
}
