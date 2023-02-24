import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    let {isAuth,token} = useSelector((store)=>store.authManager)
    if(!isAuth){
        return <Navigate to={"/login"}/>
    }
  return (children)
}

export default PrivateRoute