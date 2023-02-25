import axios from 'axios'
import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_FAILURE, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from './auth.actionTypes'



export const loginAction = (payload) => (dispatch) => {
    dispatch({type:USER_LOGIN_REQUEST})
    return(
        
        axios({
            method:"POST",
            url:"http://localhost:8080/user/login",
            data: payload,
    
            headers:{
                "Authorization":JSON.parse(localStorage.getItem("token")),
                "Content-Type":"application/json"
            }
          }).then(res=>{
            console.log(res)
            if(res.data.token){
                localStorage.setItem("token",JSON.stringify(res.data.token))
                localStorage.setItem("user",JSON.stringify(res.data.user))


            }

            dispatch({type:USER_LOGIN_SUCCESS,payload:res.data})
            
          }).catch(err=>{
            dispatch({type:USER_LOGIN_FAILURE})
          })
    )

}

export const signupAction = (payload) => (dispatch) => {
   dispatch({type:USER_SIGNUP_REQUEST})
   return(
    axios({
        method:"POST",
        url:"http://localhost:8080/user/register",
        data: payload,

        headers:{
            "Content-Type":"application/json",
        }
    }).then(res=>{
        console.log(res)
        dispatch({type:USER_SIGNUP_SUCCESS,payload:res})
    }).catch(err=>{
        dispatch({type:USER_SIGNUP_FAILURE})
    })
   )
}
export const logoutAction = (dispatch)=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return (
        dispatch({type:USER_LOGOUT})
    )
}