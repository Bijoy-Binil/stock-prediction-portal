import React, { useContext, useState } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
const Header = () => {
  
    const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)
    const navigate=useNavigate()
    const handleLogout = ()=>{
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      setIsLoggedIn(false)
      navigate('/login')

    }
  return (
    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>
        
        <div>
          {isLoggedIn ?<>( <Button class={"btn-info mx-2"} text={"Dashboard"} url={"/dashboard"}/><button className='btn btn-danger' onClick={handleLogout}>Logout</button> ) </> : (
           <><Button class={"btn-outline-info mx-2"} text={"Login"} url={"/login"}/> 
           <Button class={"btn-info"} text={"Register"} url={"/register"}/>
           </> ) } 
            
            &nbsp;
             
           
        </div>
    </nav> 
    </>
  )
}

export default Header