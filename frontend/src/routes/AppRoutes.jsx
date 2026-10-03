import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import PublicRoutes from './PublicRoutes'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoutes from './ProtectedRoutes'
import ProductPage from '../pages/ProductPage'



const AppRoutes = () => {
    

    let router = createBrowserRouter([
        {
            path:"",
            element: <PublicRoutes />,
            children:[
                {
                    path:"",
                    element: <ProductPage />
                },


                {
                    path:"/auth",
                    element: <AuthLayout />,
                    children: [
                        {
                            path:"login",
                            element: <Login />
                        },
                        {
                            path:"register",
                            element: <Register />
                        }
                    ]
                }
            ]
            
        },


        {
            path:"/main",
            element: <ProtectedRoutes />,

            children:[
                {
                    path:"",
                    element:<ProductPage />
                }
            ]
        }
    ])



  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes