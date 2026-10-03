import React from 'react'
import {Navigate, Outlet} from 'react-router'

const AuthLayout = () => {

    


  return (
   <div>
        <Navigate to={"/auth/login"} />
        <Outlet />
   </div>
  )
}

export default AuthLayout