import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { AuthContext } from './AuthProvider'

const PublicRoute = ({children}) => {

  const {isLoggedIn}=useContext(AuthContext)
console.log("PublicRoute==>",isLoggedIn)
  return !isLoggedIn?children:<Navigate to="/dashboard" />
}
   
 


export default PublicRoute