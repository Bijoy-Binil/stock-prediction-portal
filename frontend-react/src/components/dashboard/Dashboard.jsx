
import React, { useEffect } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
  const accessToken=localStorage.getItem("accessToken")
  
  useEffect(()=>{
 const fetchProtectedData= async ()=>{
try {
  const response= await axiosInstance.get("/protected-view",{
  headers:
  {Authorization:`Bearer ${accessToken}`
}
})
  console.log("Success: ",response.data)
} catch (error) {
  console.error(`Error fecthing data: ${error}`)
}
 }
 fetchProtectedData()
  },[])
  return (
    <>
       <div className="container ">
         <div className="row justify-content-center">
           <div className="col-md-6 bg-light-dark p-5 rounded">
             <h3 className="text-light text-center mb-5">DashBoard</h3>
           
           </div>
         </div>
       </div>
     </>
  )
}

export default Dashboard