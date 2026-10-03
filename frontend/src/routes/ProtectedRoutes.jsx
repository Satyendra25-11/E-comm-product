import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/MyContext'
import Login from '../pages/Login'
import { useEffect } from 'react'
import useApi from '../shared/api'

const ProtectedRoutes = () => {

  const {loggedInUser, accessToken, setAccessToken} = useAuth()
  const api = useApi()
  const navigate = useNavigate()
 
  

      useEffect(() => {
              const verifyUser = async () => {
  
                  try {
                      const response = await api.post(
                          "/auth/refresh-token",
                      );

                      setAccessToken(response.data.data.accessToken)
                      navigate("/main")
                      
                  } catch (error) {
                     navigate("/auth/login")
                  }
              }
  
              verifyUser()
          }, [])


  // if(!accessToken){
  //   navigate("/auth/login")
  //   // return <Login />
  // }
  return (
    <div>
    <Navbar />
    <Outlet />
    </div>
  )
}

export default ProtectedRoutes