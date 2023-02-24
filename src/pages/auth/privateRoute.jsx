import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    let {isAuth} = useSelector((store)=>store.authManager)
    let token = JSON.parse(localStorage.getItem("token"))
    console.log(token)
    if(token){
      console.log("akl")
    }
    if(!isAuth && !token){
        return <Navigate to={"/login"}/>
    }
  return (children)
}

export default PrivateRoute